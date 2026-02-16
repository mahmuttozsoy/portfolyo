import { Router } from 'express';
import { getProfile, getFullProfile, updateProfile } from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getProfile);
router.get('/full', getFullProfile);
router.put('/', authenticate, updateProfile);

export default router;
