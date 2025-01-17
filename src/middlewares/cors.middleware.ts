import { Application } from 'express';
import cors from 'cors';

export const applyCorsMiddleware = (app: Application) =>
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
