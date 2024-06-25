import { AssocRoleUserRepository } from '../../application/repositories/assoc-role-user-repository.ts';
import { AssocRoleUser } from '../../domain/entities/assoc-role-user.ts';

export class InMemoryAssocRoleUser implements AssocRoleUserRepository {
    public assocs: AssocRoleUser[] = [];

    async findByAssoc(assoc: AssocRoleUser): Promise<AssocRoleUser | null> {
        const result = this.assocs.find(
            (props) =>
                props.getIdRole === assoc.getIdRole &&
                props.getIdUser === assoc.getIdUser,
        );

        return result ?? null;
    }

    async findByRole(id: number): Promise<AssocRoleUser | null> {
        const result = this.assocs.find((props) => props.getIdRole === id);

        return result ?? null;
    }

    async findByUser(id: string): Promise<AssocRoleUser | null> {
        const result = this.assocs.find((props) => props.getIdUser === id);

        return result ?? null;
    }

    async save(assoc: AssocRoleUser): Promise<void> {
        this.assocs.push(assoc);
    }
}
