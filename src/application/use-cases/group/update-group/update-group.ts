import { Group } from '../../../../domain/entities/group.ts';
import { Either, left, right } from '../../../../domain/errors/either.ts';
import { GroupRepository } from './../../../repositories/group-repository.ts';

export interface UpdateGroupProps {
    DESCRIPTION: string;
}

type Response = Either<Error, Group>;

export class UpdateGroup {
    constructor(private groupRepository: GroupRepository) {}

    async execute(
        id: number,
        updateProps: UpdateGroupProps,
    ): Promise<Response> {
        if (await this.groupRepository.findById(id)) {
            if (
                await this.groupRepository.findByName(updateProps.DESCRIPTION)
            ) {
                return left(new Error('description already in use'));
            }

            const result = await this.groupRepository.update(id, updateProps);

            if (result) {
                return right(result);
            }

            return left(
                new Error('group not update, please ,check your parameters'),
            );
        }
        return left(new Error('group not found'));
    }
}
