import { Router } from 'express';
import { getMessages, sendMessage, deleteMessage } from '../controllers/contact.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getMessages); // Only admin can read messages
router.post('/', sendMessage); // Public can send
router.delete('/:id', authenticate, deleteMessage);

export default router;
