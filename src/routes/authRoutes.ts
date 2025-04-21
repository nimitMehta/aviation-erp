import { Router } from 'express';
import { signInPage, sendOtp, verifyOtp } from '../controllers/authController';
import { noLayout } from '../middlewares/noLayout';

const router = Router();

// Apply noLayout middleware to all auth routes
router.use(noLayout);

router.get('/sign-in', signInPage);
router.post('/sign-in/send', sendOtp);
router.post('/sign-in/verify', verifyOtp);

router.post('/logout', (req, res) => {
  res.clearCookie('auth_token'); // Clear the auth token cookie
  res.redirect('/sign-in');
});



export default router;
