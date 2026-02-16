import { Router } from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experience.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getExperiences);
router.post('/', authenticate, createExperience);
router.put('/:id', authenticate, updateExperience);
router.delete('/:id', authenticate, deleteExperience);

export default router;
