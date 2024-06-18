import { Role, RoleProps } from '../../../../domain/entities/role';
import { InMemoryRolesRepositores } from '../../../../tests/repositories/in-memory-roles-repositories';
import { RoleRepository } from './../../../repositories/role-repository';
import { beforeAll, describe, expect, it } from 'vitest';
import { CreateRole } from './create-role';

describe('Create an role with use case', () => {
    let roleRepository: RoleRepository;
    let createRole: CreateRole;
    let propsRole: RoleProps;

    beforeAll(() => {
        roleRepository = new InMemoryRolesRepositores();
        createRole = new CreateRole(roleRepository);
        propsRole = {
            DESCRIPTION: 'test',
            ID_ROLE: 1,
        };
    });

    it('Should be able create an role', async () => {
        const result = await createRole.execute(propsRole);
        expect(result.isRight()).toBe(true);

        if (result.isRight()) {
            expect(result.value).instanceOf(Role);
        }
    });

    it('Slould be able create an role,if not exist ID params', async () => {
        const result = await createRole.execute({
            DESCRIPTION: 'teste',
        });
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Role);
        }
    });

    it('Slould be able deny creation an role,if case ID already exist', async () => {
        const result = await createRole.execute(propsRole);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('ID already exist');
        }
    });

    it('Slould be able deny creation an role,if case description already exist', async () => {
        const result = await createRole.execute({
            ID_ROLE: 2,
            DESCRIPTION: propsRole.DESCRIPTION,
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('Description already exist');
        }
    });
});
