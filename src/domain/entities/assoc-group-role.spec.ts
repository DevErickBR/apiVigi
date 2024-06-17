import { describe, expect, it } from 'vitest';
import { Group } from './group';
import { Role } from './role';
import { AssocGroupRole } from './assoc-group-role';

describe('Create an association between group the role', () => {
    const group = new Group({ DESCRIPTION: 'test', ID_GROUP: 1 });
    const role = new Role({ DESCRIPTION: 'test', ID_ROLE: 1 });

    it('sould be abre create an association', () => {
        const result = new AssocGroupRole({
            ID_GROUP: group.id!,
            ID_ROLE: role.id!,
        });

        expect(result).instanceOf(AssocGroupRole);
    });
});
