import cookieParser from 'cookie-parser';
import { Application } from 'express';

export const applyCookieMiddleware = (app: Application) =>
  app.use(cookieParser());
