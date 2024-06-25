import { CreateAssocRoleUser } from './create-assoc-role-user.ts';
import { InMemoryAssocRoleUser } from '../../../../tests/repositories/in-memory-assoc-role-user.ts';
import { InMemoryRolesRepositores } from '../../../../tests/repositories/in-memory-roles-repositories.ts';
import { InMemoryUsersRepository } from '../../../../tests/repositories/in-memory-users-repositories.ts';
import { AssocRoleUserRepository } from './../../../repositories/assoc-role-user-repository.ts';
import { RoleRepository } from './../../../repositories/role-repository.ts';
import { UserRepository } from './../../../repositories/user-repository.ts';
import { beforeAll, describe, expect, it } from 'vitest';
import { Role } from '../../../../domain/entities/role.ts';
import { randomUUID } from 'crypto';
import { User } from '../../../../domain/entities/user.ts';
import { AssocRoleUser } from '../../../../domain/entities/assoc-role-user.ts';

describe('create an association between user the role, with use case', () => {
    let userRepository: UserRepository;
    let roleRepository: RoleRepository;
    let assocRoleUserRepository: AssocRoleUserRepository;
    let createAssocRoleUser: CreateAssocRoleUser;
    const role = new Role({ DESCRIPTION: 'role test', ID_ROLE: 1 });
    const user = new User({
        ID_USER: randomUUID(),
        NAME: 'fulano',
        LASTNAME: 'cliclano',
        EMAIL: 'fulano@cliclano.com',
        ID_LICENCE: 99,
        ID_SITUATION: 1,
        PASSWORD: '12345678',
        LASTED_PAYMENT: new Date(),
    });

    beforeAll(() => {
        userRepository = new InMemoryUsersRepository();
        roleRepository = new InMemoryRolesRepositores();
        assocRoleUserRepository = new InMemoryAssocRoleUser();
        createAssocRoleUser = new CreateAssocRoleUser(
            assocRoleUserRepository,
            userRepository,
            roleRepository,
        );
        userRepository.save(user);
        roleRepository.save(role);
    });

    it('should be able create an association', async () => {
        if (role.id) {
            const result = await createAssocRoleUser.execute({
                ID_ROLE: role.id,
                ID_USER: user.id,
            });
            expect(result.isRight()).toBe(true);
            if (result.isRight()) {
                expect(result.value).instanceOf(AssocRoleUser);
                expect(result.value.getIdRole).toBe(role.id);
                expect(result.value.getIdUser).toBe(user.id);
            }
        }
    });
    it('should be able deny creation an association, if case association already exist', async () => {
        if (role.id) {
            const assoc = await createAssocRoleUser.execute({
                ID_ROLE: role.id,
                ID_USER: user.id,
            });
            if (assoc.isRight()) {
                assocRoleUserRepository.save(assoc.value);
            }
            const result = await createAssocRoleUser.execute({
                ID_ROLE: role.id,
                ID_USER: user.id,
            });
            expect(result.isLeft()).toBe(true);
            if (result.isLeft()) {
                expect(result.value).instanceOf(Error);
                expect(result.value.message).toBe(
                    'is association already exist',
                );
            }
        }
    });

    it('should be able deny creation an association, if case user not exist', async () => {
        if (role.id) {
            const result = await createAssocRoleUser.execute({
                ID_ROLE: role.id,
                ID_USER: 'not exist',
            });
            expect(result.isLeft()).toBe(true);
            if (result.isLeft()) {
                expect(result.value).instanceOf(Error);
                expect(result.value.message).toBe(
                    'user with this ID not fould',
                );
            }
        }
    });

    it('should be able deny creation an association, if case role not exist', async () => {
        if (role.id) {
            const result = await createAssocRoleUser.execute({
                ID_ROLE: 3,
                ID_USER: user.id,
            });
            expect(result.isLeft()).toBe(true);
            if (result.isLeft()) {
                expect(result.value).instanceOf(Error);
                expect(result.value.message).toBe(
                    'role with this ID not fould',
                );
            }
        }
    });
});
