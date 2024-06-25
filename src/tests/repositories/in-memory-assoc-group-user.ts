import { AssocGroupUserRepository } from '../../application/repositories/assoc-group-user-repository.ts';
import { AssocGroupUser } from '../../domain/entities/assoc-group-user.ts';

export class InMemoryAssocGroupUser implements AssocGroupUserRepository {
    public associations: AssocGroupUser[] = [];

    async FindPerGroup(groupId: number): Promise<AssocGroupUser | null> {
        const result = this.associations.find(
            (associations) => associations.getIdGroup === groupId,
        );

        return result ?? null;
    }

    async FindPerUser(userId: string): Promise<AssocGroupUser | null> {
        const result = this.associations.find(
            (associations) => associations.getIdUser === userId,
        );

        return result ?? null;
    }

    async FindPerGroupAndUser(
        association: AssocGroupUser,
    ): Promise<AssocGroupUser | null> {
        const result = this.associations.find(
            (assoc) =>
                assoc.getIdGroup === association.getIdGroup &&
                assoc.getIdUser === association.getIdUser,
        );

        return result ?? null;
    }

    async save(assocGroupUser: AssocGroupUser): Promise<void> {
        this.associations.push(assocGroupUser);
    }
}
