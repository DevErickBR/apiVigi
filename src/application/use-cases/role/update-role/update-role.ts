import { Role } from '../../../../domain/entities/role.ts';
import { Either, left, right } from '../../../../domain/errors/either.ts';
import { RoleRepository } from './../../../repositories/role-repository.ts';

export interface UpdateRoleProps {
    DESCRIPTION: string;
}

type Response = Either<Error, Role>;

export class UpdateRole {
    constructor(private roleRepository: RoleRepository) {}

    async execute(id: number, updateProps: UpdateRoleProps): Promise<Response> {
        if (await this.roleRepository.findById(id)) {
            if (await this.roleRepository.findByName(updateProps.DESCRIPTION)) {
                return left(new Error('description already in use'));
            }

            const result = await this.roleRepository.update(id, updateProps);

            if (result) {
                return right(result);
            }
        }

        return left(new Error('role not found'));
    }
}
