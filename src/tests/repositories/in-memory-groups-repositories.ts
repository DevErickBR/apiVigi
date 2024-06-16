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
}
