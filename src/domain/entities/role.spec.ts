import { describe, expect, it } from 'vitest';
import { Role, RoleProps } from './role';

describe('Create Role with entities', () => {
    it('should be able create an user', () => {
        const roleProps: RoleProps = {
            ID_ROLE: 1,
            DESCRIPTION: 'test',
        };
        const role = new Role(roleProps);

        expect(role).instanceOf(Role);
        expect(role.id).toBe(roleProps.ID_ROLE);
        expect(role.description).toBe(roleProps.DESCRIPTION);
    });
});
