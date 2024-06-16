import { Group } from '../../domain/entities/group';

export interface GroupRepository {
    findById(id: number): Promise<Group | null>;
    findByName(name: string): Promise<Group | null>;
    save(group: Group): Promise<void>;
}
