import { Router } from 'express';
import * as userController from '@/controllers/user.controller';
import { authenticateJwt } from '@/middleware/auth.middleware';

const router: Router = Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);

router.get('/profile', authenticateJwt, userController.getProfile);

export default router;
