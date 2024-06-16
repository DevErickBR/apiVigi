import { Role } from '../../domain/entities/role';

export interface RoleRepository {
    findById(id: number): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    save(role: Role): Promise<void>;
}
