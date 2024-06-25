import { AssocGroupUserRepository } from './../../../repositories/assoc-group-user-repository.ts';
import { AssocGroupUser } from '../../../../domain/entities/assoc-group-user.ts';
import { Either, left, right } from '../../../../domain/errors/either.ts';

type Response = Either<Error, AssocGroupUser>;

export class GetAssocGroupUser {
    constructor(private assocGroupUserRepository: AssocGroupUserRepository) {}

    async execute(props: AssocGroupUser): Promise<Response> {
        const result =
            await this.assocGroupUserRepository.FindPerGroupAndUser(props);

        if (result) {
            return right(result);
        }

        return left(new Error('not fould this association'));
    }
}
