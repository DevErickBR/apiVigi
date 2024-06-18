import { AssocGroupRole } from './../../domain/entities/assoc-group-role';

export interface AssocGroupRoleRepository {
    findByAssoc(assoc: AssocGroupRole): Promise<AssocGroupRole | null>;
    findByGroup(id: number): Promise<AssocGroupRole | null>;
    findByRole(id: number): Promise<AssocGroupRole | null>;
    save(assoc: AssocGroupRole): Promise<void>;
}
