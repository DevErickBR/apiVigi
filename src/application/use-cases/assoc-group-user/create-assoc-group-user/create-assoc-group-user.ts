import { GroupRepository } from '../../../repositories/group-repository';
import { UserRepository } from '../../../repositories/user-repository';
import {
    AssocGroupUser,
    AssocGroupUserProps,
} from '../../../../domain/entities/assoc-group-user';
import { Either, left, right } from '../../../../domain/errors/either';
import { AssocGroupUserRepository } from '../../../repositories/assoc-group-user-repository';

type Response = Either<Error, AssocGroupUser>;

export class CreateAssocGroupUser {
    constructor(
        private assocGroupUserRepository: AssocGroupUserRepository,
        private userRepository: UserRepository,
        private groupRepository: GroupRepository,
    ) {}

    async execute(props: AssocGroupUserProps): Promise<Response> {
        if (!(await this.userRepository.findById(props.ID_USER))) {
            return left(new Error('this user not found'));
        }

        if (!(await this.groupRepository.findById(props.ID_GROUP))) {
            return left(new Error('this group not found'));
        }

        const groupUser = new AssocGroupUser(props);

        if (
            await this.assocGroupUserRepository.FindPerGroupAndUser(groupUser)
        ) {
            return left(new Error('this association already exist'));
        }

        this.assocGroupUserRepository.save(groupUser);

        return right(groupUser);
    }
}
