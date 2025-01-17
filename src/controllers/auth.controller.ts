import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { checkExistingUser, createNewUser } from '../services/user.service';
import {
  deleteExpiredRefreshTokens,
  deleteRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  getRefreshToken,
  verifyRefreshToken,
} from '../services/token.service';

export const register = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is required' });
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ error: 'Email, password and name are required' });
  }

  try {
    const alreadyExists = await checkExistingUser(email);
    if (alreadyExists) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createNewUser(email, hashedPassword, name);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await checkExistingUser(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Delete expired refresh tokens for the user
    const deleteResult = await deleteExpiredRefreshTokens(user.id);
    console.log(
      `${deleteResult.count} expired tokens deleted for user id ${user.id} (name ${user.name})`
    );

    const accessToken = generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(user.id);

    res.cookie('refreshToken_cinema_pulse_api', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies['refreshToken_cinema_pulse_api'];

  if (!refreshToken) {
    return res
      .status(400)
      .json({ message: 'No refresh token found in cookies' });
  }

  try {
    const existingToken = await getRefreshToken(refreshToken);

    if (!existingToken) {
      return res.status(404).json({ error: 'Refresh token not found' });
    }

    await deleteRefreshToken(refreshToken);

    res.clearCookie('refreshToken_cinema_pulse_api', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    const payload = await verifyRefreshToken(token);
    if (!payload) {
      return res
        .status(403)
        .json({ error: 'Invalid or expired refresh token' });
    }

    const accessToken = generateAccessToken((payload as any).userId);
    res.json({ accessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
