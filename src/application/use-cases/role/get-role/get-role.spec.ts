import { Role, RoleProps } from '../../../../domain/entities/role';
import { InMemoryRolesRepositores } from '../../../../tests/repositories/in-memory-roles-repositories';
import { RoleRepository } from './../../../repositories/role-repository';
import { beforeAll, describe, expect, it } from 'vitest';
import { GetRole } from './get-role';

describe('getting an role', () => {
    let roleRepository: RoleRepository;
    let getRole: GetRole;
    let roleProps: RoleProps;

    beforeAll(() => {
        roleRepository = new InMemoryRolesRepositores();
        getRole = new GetRole(roleRepository);
        roleProps = {
            DESCRIPTION: 'test',
            ID_ROLE: 2,
        };
        const role = new Role(roleProps);
        roleRepository.save(role);
    });
    it('should be able find an role, with description params', async () => {
        const result = await getRole.getByDescription(roleProps.DESCRIPTION);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Role);
        }
    });

    it('should be able find an role, with ID params', async () => {
        const result = await getRole.getByID(roleProps.ID_ROLE!);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Role);
        }
    });

    it('slould be able not find an role, with description params', async () => {
        const result = await getRole.getByDescription('not exist');
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe(
                'not found role with this description',
            );
        }
    });

    it('slould be able not find an role, with ID params', async () => {
        const result = await getRole.getByID(1);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('not found role with this ID');
        }
    });
});
