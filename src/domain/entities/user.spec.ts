import { expect, describe, it } from 'vitest';
import { User } from './user';
import { randomUUID } from 'crypto';

describe('Create User with entities', () => {
    it('should be able creat an user', () => {
        const userProps = {
            ID_USER: randomUUID(),
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 1,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        };

        const user = new User(userProps);

        expect(user).instanceOf(User);
        expect(user.id).toBe(userProps.ID_USER);
        expect(user.name).toBe(userProps.NAME);
        expect(user.lastname).toBe(userProps.LASTNAME);
        expect(user.email).toBe(userProps.EMAIL);
        expect(user.idLicence).toBe(userProps.ID_LICENCE);
        expect(user.idSituation).toBe(userProps.ID_SITUATION);
        expect(user.password).toBe(userProps.PASSWORD);
        expect(user.idSituation).toBe(userProps.ID_SITUATION);
        expect(user.lastname).toBe(userProps.LASTNAME);
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
