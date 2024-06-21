import { Group } from '../../domain/entities/group';
import { UpdateGroupProps } from '../use-cases/group/update-group/update-group';

export interface GroupRepository {
    findById(id: number): Promise<Group | null>;
    findByName(name: string): Promise<Group | null>;
    save(group: Group): Promise<void>;
    update(id: number, updateProps: UpdateGroupProps): Promise<Group | null>;
    delete(id: number): Promise<void>;
}
