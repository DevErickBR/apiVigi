import { Either, left, right } from './../../domain/errors/either.ts';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user-repository.ts';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface AuthResponse {
    token: string;
    idUser: string;
    emailUser: string;
}

type Response = Either<Error, AuthResponse>;

export class AuthController {
    constructor(private userRepository: UserRepository) {}

    async Authenticate(email: string, password: string): Promise<Response> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return left(new Error('email not found'));
        }
        console.log(user);
        const passwordAuth = await bcrypt.compare(password, user.password);

        if (!passwordAuth) {
            return left(new Error('password invalid'));
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_KEY as string,
            {
                expiresIn: '3h',
            },
        );
        const userAuth: AuthResponse = {
            emailUser: user.email,
            idUser: user.id,
            token: token,
        };
        return right(userAuth);
    }
}
