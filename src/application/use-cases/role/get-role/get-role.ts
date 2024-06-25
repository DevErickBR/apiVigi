import { RoleRepository } from './../../../repositories/role-repository.ts';
import { Role } from '../../../../domain/entities/role.ts';
import { Either, left, right } from '../../../../domain/errors/either.ts';

type Response = Either<Error, Role>;

export class GetRole {
    constructor(private roleRepository: RoleRepository) {}

    async getByID(id: number): Promise<Response> {
        const result = await this.roleRepository.findById(id);

        if (result) {
            return right(result);
        }

        return left(new Error('not found role with this ID'));
    }
    async getByDescription(description: string): Promise<Response> {
        const result = await this.roleRepository.findByName(description);

        if (result) {
            return right(result);
        }

        return left(new Error('not found role with this description'));
    }
}
