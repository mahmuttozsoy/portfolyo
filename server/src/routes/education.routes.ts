import { Router } from 'express';
import { getEducations, createEducation, updateEducation, deleteEducation } from '../controllers/education.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getEducations);
router.post('/', authenticate, createEducation);
router.put('/:id', authenticate, updateEducation);
router.delete('/:id', authenticate, deleteEducation);

export default router;
