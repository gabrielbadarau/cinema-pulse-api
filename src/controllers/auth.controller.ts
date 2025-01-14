import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { checkExistingUser, createNewUser } from '../services/user.service';

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

export const login = async (req: Request, res: Response) => {};

export const logout = async (req: Request, res: Response) => {};

export const refreshToken = async (req: Request, res: Response) => {};
