import { AssocGroupRole } from '../../domain/entities/assoc-group-role.ts';
import { AssocGroupRoleRepository } from './../../application/repositories/assoc-group-role-repository.ts';

export class InMemoryAssocGroupRole implements AssocGroupRoleRepository {
    public assocs: AssocGroupRole[] = [];

    async findByAssoc(assoc: AssocGroupRole): Promise<AssocGroupRole | null> {
        const result = this.assocs.find(
            (props) =>
                props.getIdGroup === assoc.getIdGroup &&
                props.getIdRole === assoc.getIdRole,
        );

        return result ?? null;
    }

    async findByRole(id: number): Promise<AssocGroupRole | null> {
        const result = this.assocs.find((props) => props.getIdRole === id);

        return result ?? null;
    }

    async findByGroup(id: number): Promise<AssocGroupRole | null> {
        const result = this.assocs.find((props) => props.getIdGroup === id);

        return result ?? null;
    }

    async save(assoc: AssocGroupRole): Promise<void> {
        this.assocs.push(assoc);
    }
}
