import { Either, left, right } from '../../../../domain/errors/either';
import { GroupRepository } from '../../../repositories/group-repository';
import { Group } from '../../../../domain/entities/group';

type Response = Either<Error, Group>;

export class GetGroup {
    constructor(private groupRepository: GroupRepository) {}

    async getById(id: number): Promise<Response> {
        const response = await this.groupRepository.findById(id);

        if (response) {
            return right(response);
        }

        return left(new Error('not found group with this ID'));
    }

    async getByName(description: string): Promise<Response> {
        const result = await this.groupRepository.findByName(description);

        if (result) {
            return right(result);
        }

        return left(new Error('not found group with this description'));
    }
}
