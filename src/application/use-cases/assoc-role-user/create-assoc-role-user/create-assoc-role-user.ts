import { RoleRepository } from './../../../repositories/role-repository';
import { UserRepository } from './../../../repositories/user-repository';
import { AssocRoleUserRepository } from './../../../repositories/assoc-role-user-repository';
import {
    AssocRoleUser,
    AssocRoleUserProps,
} from '../../../../domain/entities/assoc-role-user';
import { Either, left, right } from '../../../../domain/errors/either';

type Response = Either<Error, AssocRoleUser>;

export class CreateAssocRoleUser {
    constructor(
        private assocGroupRoleRepository: AssocRoleUserRepository,
        private userRepository: UserRepository,
        private roleRepository: RoleRepository,
    ) {}

    async execute(props: AssocRoleUserProps): Promise<Response> {
        if (!(await this.userRepository.findById(props.ID_USER))) {
            return left(new Error('user with this ID not fould'));
        }
        if (!(await this.roleRepository.findById(props.ID_ROLE))) {
            return left(new Error('role with this ID not fould'));
        }

        const assoc = new AssocRoleUser(props);

        if (await this.assocGroupRoleRepository.findByAssoc(assoc)) {
            return left(new Error('is association already exist'));
        }

        this.assocGroupRoleRepository.save(assoc);

        return right(assoc);
    }
}
