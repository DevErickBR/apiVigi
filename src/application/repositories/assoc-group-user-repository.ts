import { AssocGroupUser } from './../../domain/entities/assoc-group-user';

export interface AssocGroupUserRepository {
    FindPerGroupAndUser(
        association: AssocGroupUser,
    ): Promise<AssocGroupUser | null>;
    FindPerGroup(groupId: number): Promise<AssocGroupUser | null>;
    FindPerUser(userId: string): Promise<AssocGroupUser | null>;
    save(assocGroupUser: AssocGroupUser): Promise<void>;
}
