import { expect, describe, it, beforeEach } from 'vitest';
import { User, UserProps } from './user.ts';
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
});

describe('Update metods user', () => {
    let userProps: UserProps;

    beforeEach(() => {
        userProps = {
            ID_USER: randomUUID(),
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 1,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        };
    });

    it('should be able update the user name', () => {
        const user = new User(userProps);

        user.updateName('erick');
        expect(user.name).toBe('erick');
    });

    it('should be able update the user lastname ', () => {
        const user = new User(userProps);

        user.updateLastname('doe');
        expect(user.lastname).toBe('doe');
    });

    it('should be able update the user email ', () => {
        const user = new User(userProps);

        user.updateEmail('erickdoe@email.com');
        expect(user.email).toBe('erickdoe@email.com');
    });

    it('should be able update the user situation ', () => {
        const user = new User(userProps);

        user.updateSituation(2);
        expect(user.idSituation).toBe(2);
    });

    it('should be able update the user licence ', () => {
        const user = new User(userProps);

        user.updateLicence(2);
        expect(user.idLicence).toBe(2);
    });

    it('should be able update the user payment ', () => {
        const user = new User(userProps);
        const lastPayment = new Date('2024-01-01');
        user.updatePayment(lastPayment);
        expect(user.lastedPayment).toBe(lastPayment);
    });

    it('should be able update the user password ', () => {
        const user = new User(userProps);

        user.updatePassword('52366');
        expect(user.password).toBe('52366');
    });

    it('should be able update the user due date ', () => {
        const user = new User(userProps);
        const dueDate = new Date('2024-01-01');
        user.updateDueDate(dueDate);
        expect(user.dueDate).toBe(dueDate);
    });
});
