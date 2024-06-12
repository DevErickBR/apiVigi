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
        expect(user).instanceOf(User);
    });

    it('shound be able deny creation of a user if due date smaller last payment', async () => {
        expect(
            () =>
                new User({
                    ID_USER: randomUUID(),
                    NAME: 'fulano',
                    LASTNAME: 'cliclano',
                    EMAIL: 'fulano@cliclano.com',
                    ID_LICENCE: 1,
                    ID_SITUATION: 1,
                    PASSWORD: '123456789',
                    LASTED_PAYMENT: new Date(),
                    DUE_DATE: new Date('2024-01-01'),
                }),
        ).toThrow('due date smaller last payment');
    });
});
