import 'express';

declare global {
  namespace Express {
    interface AuthData {
      userId: string;
      sessionId: string;
      getToken: (tokenType?: string) => Promise<string | null>;
      claims: Record<string, any>; // Optional: Custom claims included in the token
      phoneNumber: string; // Clerk's email address field
    }

    interface Request {
      auth?: AuthData; // Extend the Request type to include `auth`
    }
  }
}
