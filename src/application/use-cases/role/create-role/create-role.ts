import { right } from './../../../../domain/errors/either.ts';
import { RoleRepository } from './../../../repositories/role-repository.ts';
import { Either, left } from '../../../../domain/errors/either.ts';
import { Role, RoleProps } from '../../../../domain/entities/role.ts';

type Response = Either<Error, Role>;

export class CreateRole {
    constructor(private roleRepository: RoleRepository) {}

    async execute(props: RoleProps): Promise<Response> {
        if (props.ID_ROLE) {
            if (await this.roleRepository.findById(props.ID_ROLE)) {
                return left(new Error('ID already exist'));
            }
        }
        if (await this.roleRepository.findByName(props.DESCRIPTION)) {
            return left(new Error('Description already exist'));
        }

        const role = new Role(props);

        this.roleRepository.save(role);

        return right(role);
    }
}
