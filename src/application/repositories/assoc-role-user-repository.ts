import { AssocRoleUser } from '../../domain/entities/assoc-role-user';

export interface AssocRoleUserRepository {
    findByAssoc(assoc: AssocRoleUser): Promise<AssocRoleUser | null>;
    findByUser(id: string): Promise<AssocRoleUser | null>;
    findByRole(id: number): Promise<AssocRoleUser | null>;
    save(assoc: AssocRoleUser): Promise<void>;
}
