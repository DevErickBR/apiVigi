import { beforeEach, describe, expect, it } from 'vitest';
import { User } from './user.ts';
import { Group } from './group.ts';
import { randomUUID } from 'crypto';
import { AssocGroupUser } from './assoc-group-user.ts';

describe('Create an association between user the group', () => {
    let user: User;
    let group: Group;
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

        group = new Group({ DESCRIPTION: 'test', ID_GROUP: 1 });
    });

    it('should be able create an association', () => {
        const result = new AssocGroupUser({
            ID_GROUP: group.id!,
            ID_USER: user.id,
        });

        expect(result).instanceOf(AssocGroupUser);
    });
});
