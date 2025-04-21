import { Router } from 'express';
import { verifyCookie } from '../middlewares/verifyCookie';

const router = Router();

// Protect the home route with verifyCookie middleware
router.get('/', verifyCookie, (req, res) => {
  res.render('pages/home', { title: 'Home' });
});

export default router;
