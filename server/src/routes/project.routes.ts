import { Router } from 'express';
import { getProjects, getProjectBySlug, createProject } from '../controllers/project.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', authenticate, createProject);

export default router;
