import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Access token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Access token is missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.error('Invalid access token:', error);
    return res
      .status(403)
      .json({ error: 'Access token is invalid or expired' });
  }
};
