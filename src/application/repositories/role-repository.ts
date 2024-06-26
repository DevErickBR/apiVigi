import { Role } from '../../domain/entities/role.ts';
import { UpdateRoleProps } from '../use-cases/role/update-role/update-role.ts';

export interface RoleRepository {
    findById(id: number): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    update(id: number, updateProps: UpdateRoleProps): Promise<Role | null>;
    save(role: Role): Promise<void>;
}
