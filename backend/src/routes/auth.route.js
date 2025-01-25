import { Router } from 'express';
import AuthController from '../controller/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = Router();
router.get('/check', protectRoute, AuthController.checkAuth)

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

router.put('/update-profile', protectRoute, AuthController.updateProfile);

export default router;