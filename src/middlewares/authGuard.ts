import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';

export const requireAuth = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  if (!req.auth || !req.auth.userId) {
    res.redirect('/sign-in'); // Redirect unauthenticated users
    return;
  }

  const { userId, phoneNumber } = req.auth;

  try {
    // Check if the user exists in the database
    let user = await User.findOne({ clerkId: userId });

    // If user doesn't exist, create a new user in the database
    if (!user) {
      user = await User.create({ clerkId: userId, phone: phoneNumber });
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error: any) {
    console.error(`Error in requireAuth middleware: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};
