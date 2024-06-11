import { expect, describe, it } from 'vitest';
import { User } from './user';
import { randomUUID } from 'crypto';

describe('Create User with entities', () => {
    it('should be able creat an user', () => {
        const user = new User({
            ID_USER: randomUUID(),
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 1,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        });
        console.log(user);
        expect(user).instanceOf(User);
    });
});
