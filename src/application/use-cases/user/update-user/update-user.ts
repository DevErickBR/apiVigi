import { User } from '../../../../domain/entities/user';
import { Either, left, right } from '../../../../domain/errors/either';
import { UserRepository } from './../../../repositories/user-repository';
export interface UpdateUserProps {
    ID_USER: string;
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

    async execute(props: UpdateUserProps): Promise<Response> {
        const result = await this.userRepository.update(props);

        if (result) {
            return right(result);
        }

        return left(new Error('user not update'));
    }
}
