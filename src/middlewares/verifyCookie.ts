import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const verifyCookie = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;
  if (!token) {
    console.log('No token found in cookies');
    return res.redirect('/sign-in');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.locals.user = decoded; // Make user info available to views
    next();
  } catch (error: any) {
    console.error('Invalid token:', error.message);
    res.clearCookie('auth_token'); // Clear invalid token
    return res.redirect('/sign-in');
  }
};
