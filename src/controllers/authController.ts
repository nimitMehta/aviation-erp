import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import twilio from 'twilio';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID!;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Render the Sign-In Page
export const signInPage = (req: any, res: Response) => {
  res.render('pages/sign-in', { title: 'Sign In', message: null, phone: null, layout: false });
};

// Handle Sending OTP
export const sendOtp = async (req: any, res: Response) => {
  const { phone } = req.body;
  try {
    // Send OTP using Twilio Verify
    await client.verify.v2.services(TWILIO_SERVICE_SID).verifications.create({
      to: phone,
      channel: 'sms',
    });

    res.render('pages/sign-in', { title: 'Verify OTP', message: 'OTP sent to your phone.', phone, layout: false });
  } catch (error: any) {
    console.error('Error sending OTP:', error.message);
    res.render('pages/sign-in', { title: 'Sign In', message: 'Failed to send OTP. Try again.', phone: null, layout: false });
  }
};

// Handle Verifying OTP and Setting Cookies
export const verifyOtp = async (req: any, res: Response) => {
  const { phone, code } = req.body;

  try {
    // Verify OTP using Twilio Verify
    const verificationCheck = await client.verify.v2.services(TWILIO_SERVICE_SID).verificationChecks.create({
      to: phone,
      code,
    });

    if (verificationCheck.status === 'approved') {
      let user = await User.findOne({ phone });
      if (!user) {
        user = await User.create({ phone });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, phone: user.phone }, JWT_SECRET, {
        expiresIn: '48h', // Token valid for 48 hours
      });

      // Set cookie with the token
      res.cookie('auth_token', token, {
        httpOnly: true,
        maxAge: 48 * 60 * 60 * 1000, // 48 hours in milliseconds
      });

      res.redirect('/');
    } else {
      res.render('pages/sign-in', { title: 'Verify OTP', message: 'Invalid OTP. Try again.', phone, layout: false });
    }
  } catch (error: any) {
    console.error('Error verifying OTP:', error.message);
    res.render('pages/sign-in', { title: 'Verify OTP', message: 'Failed to verify OTP. Please try again.', phone, layout: false });
  }
};
