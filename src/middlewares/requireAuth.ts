import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: any, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.user) {
    req.session.redirectTo = req.originalUrl; // Store the original URL
    return res.redirect('/sign-in');
  }
  next();
};
