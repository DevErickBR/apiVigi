import { beforeEach, describe, expect, it } from 'vitest';
import { User } from './user.ts';
import { randomUUID } from 'crypto';
import { Role } from './role.ts';
import { AssocRoleUser } from './assoc-role-user.ts';

describe('Create an association between user the role', () => {
    let user: User;
    let role: Role;

    beforeEach(() => {
        user = new User({
            ID_USER: randomUUID(),
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 1,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        });

        role = new Role({ DESCRIPTION: 'test', ID_ROLE: 1 });
    });

    it('should be able create an association', () => {
        const result = new AssocRoleUser({
            ID_ROLE: role.id!,
            ID_USER: user.id,
        });

        expect(result).instanceOf(AssocRoleUser);
        expect(result.getIdRole).toBe(role.id);
        expect(result.getIdUser).toBe(user.id);
    });
});
