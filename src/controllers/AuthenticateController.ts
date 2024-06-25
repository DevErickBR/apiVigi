import { Request, Response } from 'express';
import { AuthController } from '../application/services/auth.ts';
import { SequelizeUserRepository } from '../infra/repositories/sequelizeUserRepository.ts';

export async function AuthenticateController(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json(
            'email or password is null, please check your paramaters',
        );
    }

    const usersRepo = new SequelizeUserRepository();
    const authController = new AuthController(usersRepo);
    const accountAuthenticate = await authController.Authenticate(
        email,
        password,
    );

    if (accountAuthenticate.isRight()) {
        res.status(200).json(accountAuthenticate.value);
    }
}
