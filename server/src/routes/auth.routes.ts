import { Router } from 'express';
import { login, logout, checkAuth } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, checkAuth);

export default router;
