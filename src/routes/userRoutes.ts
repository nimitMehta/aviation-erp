import { Router } from 'express';
import { requireAuth } from '../middlewares/authGuard';
import { getUsers } from '../controllers/userController';

const router = Router();

router.get('/', requireAuth, getUsers);

export default router;
