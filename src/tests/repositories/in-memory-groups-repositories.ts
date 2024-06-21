import { UpdateGroupProps } from '../../application/use-cases/group/update-group/update-group';
import { Group } from '../../domain/entities/group';
import { GroupRepository } from './../../application/repositories/group-repository';

export class InMemoruGroupRepository implements GroupRepository {
    public groups: Group[] = [];

    async findById(id: number): Promise<Group | null> {
        const group = this.groups.find((group) => group.id === id);

        return group ?? null;
    }

    async findByName(name: string): Promise<Group | null> {
        const group = this.groups.find((group) => group.description === name);

        return group ?? null;
    }

    async save(group: Group): Promise<void> {
        this.groups.push(group);
    }

    async update(
        id: number,
        updateProps: UpdateGroupProps,
    ): Promise<Group | null> {
        const index = this.groups.findIndex((props) => props.id === id);
        if (index < 0) {
            return null;
        }

        const group = this.groups[index];

        if (updateProps.DESCRIPTION)
            group.updateDescription(updateProps.DESCRIPTION);

        return group;
    }

    async delete(id: number): Promise<void> {
        this.groups.filter((props) => props.id !== id);
    }
}
