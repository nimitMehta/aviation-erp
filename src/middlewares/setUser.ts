import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const setUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;

  if (!token) {
    // If no token is present, set user to null
    res.locals.user = null;
    return next();
  }

  try {
    // Verify the token and extract user data
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; phone: string };

    // Make user data available in res.locals
    res.locals.user = {
      id: decoded.userId,
      phone: decoded.phone,
    };

    next();
  } catch (error: any) {
    console.error('Error decoding token:', error.message);

    // Clear invalid token and set user to null
    res.clearCookie('auth_token');
    res.locals.user = null;
    next();
  }
};
