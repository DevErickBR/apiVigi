import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { AuthMiddware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create-user', AuthMiddware, CreateUserController)


export default router