import jwt from 'jsonwebtoken';

import { prisma } from '../lib/prismadb';

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
  });
};

export const generateRefreshToken = async (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export const revokeRefreshToken = async (token: string) => {
  await prisma.refreshToken.deleteMany({
    where: { token },
  });
};

export const getRefreshToken = (token: string) =>
  prisma.refreshToken.findUnique({
    where: { token },
  });

export const deleteRefreshToken = (token: string) =>
  prisma.refreshToken.delete({
    where: { token },
  });

export const deleteExpiredRefreshTokens = (userId: string) =>
  prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
      userId,
    },
  });
