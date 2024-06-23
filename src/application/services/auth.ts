import { Either, left, right } from './../../domain/errors/either';
import { compare } from 'bcryptjs';
import { UserRepository } from '../repositories/user-repository';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type Response = Either<Error, string>;

export class AuthController {
    constructor(private userRepository: UserRepository) {}

    async Authenticate(email: string, password: string): Promise<Response> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return left(new Error('email not found'));
        }

        const passwordAuth = await compare(password, user.password);

        if (!passwordAuth) {
            return left(new Error('password invalid'));
        }

        const token = sign({ id: user.id }, process.env.SECRET_KEY as string, {
            expiresIn: '3h',
        });

        return right(token);
    }
}
