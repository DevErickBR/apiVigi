import { UpdateRole } from './update-role';
import { RoleRepository } from './../../../repositories/role-repository';
import { Role, RoleProps } from './../../../../domain/entities/role';
import { beforeAll, describe, expect, it } from 'vitest';
import { InMemoryRolesRepositores } from '../../../../tests/repositories/in-memory-roles-repositories';

describe('update role', () => {
    let roleProps: RoleProps;
    let roleRepository: RoleRepository;
    let updateRole: UpdateRole;
    let role: Role;

    beforeAll(() => {
        roleProps = { DESCRIPTION: 'test', ID_ROLE: 1 };
        role = new Role(roleProps);
        roleRepository = new InMemoryRolesRepositores();
        roleRepository.save(role);
        updateRole = new UpdateRole(roleRepository);
    });

    it('shold be able update an role', async () => {
        if (role.id) {
            const result = await updateRole.execute(role.id, {
                DESCRIPTION: 'updated role',
            });
            expect(result.isRight()).toBe(true);
            if (result.isRight()) {
                expect(result.value.description).toBe('updated role');
            }
        }
    });

    it('shold be able deny update an role, if case description parameter already in use', async () => {
        const outherRole = new Role({ DESCRIPTION: 'outher role', ID_ROLE: 4 });
        roleRepository.save(outherRole);
        if (role.id) {
            const result = await updateRole.execute(role.id, {
                DESCRIPTION: 'outher role',
            });
            expect(result.isLeft()).toBe(true);
            if (result.isLeft()) {
                expect(result.value).instanceOf(Error);
                expect(result.value.message).toBe('description already in use');
            }
        }
    });

    it('shold be able deny update an role, if case not find role', async () => {
        const outherRole = new Role({ DESCRIPTION: 'outher role', ID_ROLE: 4 });
        roleRepository.save(outherRole);
        if (role.id) {
            const result = await updateRole.execute(role.id + 5500, {
                DESCRIPTION: 'outher role',
            });
            expect(result.isLeft()).toBe(true);
            if (result.isLeft()) {
                expect(result.value).instanceOf(Error);
                expect(result.value.message).toBe('role not found');
            }
        }
    });
});
