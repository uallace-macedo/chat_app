import { Router } from 'express';
import protectRoute from '../middleware/auth.middleware';
import MessageController from '../controller/message.controller';

const router = Router();

router.get('/user', protectRoute, MessageController.getSidebarContacts);
router.get('/:id', protectRoute, MessageController.getMessages);

router.post('/send/:id', protectRoute, MessageController.sendMessage);

export default router;