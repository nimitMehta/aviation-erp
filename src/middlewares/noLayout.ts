import { Request, Response, NextFunction } from 'express';

export const noLayout = (req: Request, res: Response, next: NextFunction) => {
  res.locals.useLayout = false; // Add a flag to disable layout
  next();
};
