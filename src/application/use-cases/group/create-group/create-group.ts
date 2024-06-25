import { Group, GroupProps } from '../../../../domain/entities/group.ts';
import { Either, left, right } from '../../../../domain/errors/either.ts';
import { GroupRepository } from '../../../repositories/group-repository.ts';

type Response = Either<Error, Group>;

export class CreateGroup {
    constructor(private groupRepository: GroupRepository) {}

    async execute(props: GroupProps): Promise<Response> {
        if (props.ID_GROUP) {
            if (await this.groupRepository.findById(props.ID_GROUP)) {
                return left(new Error('ID already exist'));
            }
        }
        if (await this.groupRepository.findByName(props.DESCRIPTION)) {
            return left(new Error('description already exist'));
        }

        const group = new Group(props);
        this.groupRepository.save(group);
        return right(group);
    }
}
