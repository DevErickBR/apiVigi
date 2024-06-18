import { GetAssocRoleUser } from './get-assoc-role-user';
import { AssocRoleUserRepository } from './../../../repositories/assoc-role-user-repository';
import { UUID, randomUUID } from 'crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { AssocRoleUser } from '../../../../domain/entities/assoc-role-user';
import { InMemoryAssocRoleUser } from '../../../../tests/repositories/in-memory-assoc-role-user';

describe('getting an association between user the role', () => {
    let assocRoleUser: AssocRoleUser;
    let idUser: UUID;
    let assocRoleUserRepository: AssocRoleUserRepository;
    let getAssocRoleUser: GetAssocRoleUser;

    beforeAll(() => {
        idUser = randomUUID();
        assocRoleUser = new AssocRoleUser({ ID_ROLE: 1, ID_USER: idUser });
        assocRoleUserRepository = new InMemoryAssocRoleUser();
        assocRoleUserRepository.save(assocRoleUser);
        getAssocRoleUser = new GetAssocRoleUser(assocRoleUserRepository);
    });

    it('should be able find an association, with id user parameter', async () => {
        const result = await getAssocRoleUser.getByIdUser(idUser);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(AssocRoleUser);
            expect(result.value).toBe(assocRoleUser);
        }
    });

    it('should be able find an association, with id role parameter', async () => {
        const result = await getAssocRoleUser.getByIdRole(
            assocRoleUser.getIdRole,
        );
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(AssocRoleUser);
            expect(result.value).toBe(assocRoleUser);
        }
    });

    it('should be able find an association, with association parameter', async () => {
        const result = await getAssocRoleUser.getByAssoc(assocRoleUser);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(AssocRoleUser);
            expect(result.value).toBe(assocRoleUser);
        }
    });

    it('should be able not find an association,if case id user parameter not exist', async () => {
        const result = await getAssocRoleUser.getByIdUser('dont have');
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe(
                'user does not have any association',
            );
        }
    });

    it('should be able not find an association,if case id role parameter not exist', async () => {
        const result = await getAssocRoleUser.getByIdRole(5);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe(
                'role does not have any association',
            );
        }
    });

    it('should be able not find an association,if case association parameter not exist', async () => {
        assocRoleUser = new AssocRoleUser({
            ID_ROLE: 64,
            ID_USER: 'dont have',
        });
        const result = await getAssocRoleUser.getByAssoc(assocRoleUser);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('association not found');
        }
    });
});
