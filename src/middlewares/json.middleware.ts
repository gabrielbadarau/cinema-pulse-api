import express, { Application } from 'express';

export const applyJsonMiddleware = (app: Application) =>
  app.use(express.json());
