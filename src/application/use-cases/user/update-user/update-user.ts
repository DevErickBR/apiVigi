import { User } from '../../../../domain/entities/user';
import { Either, left, right } from '../../../../domain/errors/either';
import { UserRepository } from './../../../repositories/user-repository';
export interface UpdateUserProps {
    NAME?: string;
    LASTNAME?: string;
    EMAIL?: string;
    PASSWORD?: string;
    ID_SITUATION?: number;
    ID_LICENCE?: number;
    LASTED_PAYMENT?: Date;
    DUE_DATE?: Date;
}

type Response = Either<Error, User>;

export class UpdateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, propsUpdate: UpdateUserProps): Promise<Response> {
        if (await this.userRepository.findById(id)) {
            if (propsUpdate.EMAIL) {
                if (await this.userRepository.findByEmail(propsUpdate.EMAIL)) {
                    return left(new Error('email already in use'));
                }
            }

            const result = await this.userRepository.update(id, propsUpdate);
            if (result) {
                return right(result);
            }

            return left(new Error('user not update'));
        }

        return left(new Error('user not found'));
    }
}
