import { AssocRoleUser } from '../../../../domain/entities/assoc-role-user';
import { Either, left, right } from './../../../../domain/errors/either';
import { AssocRoleUserRepository } from '../../../repositories/assoc-role-user-repository';

type Response = Either<Error, AssocRoleUser>;

export class GetAssocRoleUser {
    constructor(private assocGroupRoleRepository: AssocRoleUserRepository) {}

    async getByIdUser(id: string): Promise<Response> {
        const result = await this.assocGroupRoleRepository.findByUser(id);

        if (result) {
            return right(result);
        }

        return left(new Error('user does not have any association'));
    }

    async getByIdRole(id: number): Promise<Response> {
        const result = await this.assocGroupRoleRepository.findByRole(id);

        if (result) {
            return right(result);
        }

        return left(new Error('role does not have any association'));
    }

    async getByAssoc(association: AssocRoleUser): Promise<Response> {
        const result =
            await this.assocGroupRoleRepository.findByAssoc(association);

        if (result) {
            return right(result);
        }

        return left(new Error('association not found'));
    }
}
