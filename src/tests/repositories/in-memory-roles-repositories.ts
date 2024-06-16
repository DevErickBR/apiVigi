import { RoleRepository } from '../../application/repositories/role-repository';
import { Role } from '../../domain/entities/role';

export class InMemoryRolesRepositores implements RoleRepository {
    public roles: Role[] = [];

    async findById(id: number): Promise<Role | null> {
        const role = this.roles.find((idRole) => idRole.id === id);

        if (role) {
            return role;
        }

        return null;
    }

    async findByName(name: string): Promise<Role | null> {
        const role = this.roles.find(
            (nameRole) => nameRole.description === name,
        );
        if (role) {
            return role;
        }

        return null;
    }

    async save(role: Role): Promise<void> {
        this.roles.push(role);
    }
}
