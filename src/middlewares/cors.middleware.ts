import { Application } from 'express';
import cors from 'cors';

export const applyCorsMiddleware = (app: Application) => app.use(cors());
