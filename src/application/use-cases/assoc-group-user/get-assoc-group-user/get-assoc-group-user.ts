import { AssocGroupUserRepository } from './../../../repositories/assoc-group-user-repository';
import { AssocGroupUser } from '../../../../domain/entities/assoc-group-user';
import { Either, left, right } from '../../../../domain/errors/either';

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
