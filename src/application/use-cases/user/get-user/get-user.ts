import { User } from '../../../../domain/entities/user';
import { Either, left, right } from '../../../../domain/errors/either';
import { UserRepository } from './../../../repositories/user-repository';

type Response = Either<Error, User>;

export class GetUser {
    constructor(private userRepository: UserRepository) {}

    async getById(id: string): Promise<Response> {
        const response = await this.userRepository.findById(id);

        if (response) {
            return right(response);
        }

        return left(new Error('user not exist with this ID'));
    }

    async getByEmail(email: string): Promise<Response> {
        const response = await this.userRepository.findByEmail(email);

        if (response) {
            return right(response);
        }

        return left(new Error('user not exist with this email'));
    }
}
