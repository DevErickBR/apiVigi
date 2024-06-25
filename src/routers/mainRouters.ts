import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController.ts';
import { AuthMiddware } from '../middlewares/authMiddleware.ts';
import { AuthenticateController } from '../controllers/AuthenticateController.ts';

const router = Router();

router.post('/login', AuthenticateController);
router.post('/create-user', AuthMiddware, CreateUserController);

export default router;
