
import { clerkMiddleware } from '@clerk/express';

export const authMiddleware = clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});
