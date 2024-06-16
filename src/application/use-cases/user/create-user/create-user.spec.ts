import { it, describe, expect } from 'vitest';
import { randomUUID } from 'crypto';
import { CreateUser } from './create-user';
import { InMemoryUsersRepository } from '../../../../tests/repositories/in-memory-users-repositories';
import { User } from '../../../../domain/entities/user';
import { InMemoryLicencesRepository } from '../../../../tests/repositories/in-memory-licences-repositories';
import { Hash } from '../../../../security/hash-password';

describe('Create user with use case', () => {
    it('should be able create an user', async () => {
        const usersRepo = new InMemoryUsersRepository();
        const licenceRepo = new InMemoryLicencesRepository();
        const createUser = new CreateUser(usersRepo, licenceRepo);
        const userRequest = {
            ID_USER: randomUUID(),
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 99,
            ID_SITUATION: 1,
            PASSWORD: '12345678',
            LASTED_PAYMENT: new Date(),
        };

        const newUser = await createUser.execute(userRequest);

        expect(newUser.isRight()).toBe(true);
        if (newUser.isRight()) {
            expect(
                await Hash.verifyPassword(
                    userRequest.PASSWORD,
                    newUser.value.password,
                ),
            ).toBe(true);
            expect(newUser.value).toBeInstanceOf(User);
            expect(newUser.value.name).toBe(userRequest.NAME);
            expect(newUser.value.id).toBe(userRequest.ID_USER);
            expect(newUser.value.email).toBe(userRequest.EMAIL);
            expect(newUser.value.idLicence).toBe(userRequest.ID_LICENCE);
            expect(newUser.value.idSituation).toBe(userRequest.ID_SITUATION);
            expect(newUser.value.lastedPayment).toBe(
                userRequest.LASTED_PAYMENT,
            );
            expect(newUser.value.dueDate).toBeDefined();
        }
    });

    it('should be able create an user case not inform params id', async () => {
        const usersRepo = new InMemoryUsersRepository();
        const licenceRepo = new InMemoryLicencesRepository();
        const createUser = new CreateUser(usersRepo, licenceRepo);

        const userRequest = {
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 99,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        };

        const newUser = await createUser.execute(userRequest);
        expect(newUser.isRight()).toBe(true);
        if (newUser.isRight()) {
            expect(
                await Hash.verifyPassword(
                    userRequest.PASSWORD,
                    newUser.value.password,
                ),
            ).toBe(true);
            expect(newUser.value).toBeInstanceOf(User);
            expect(newUser.value.name).toBe(userRequest.NAME);
            expect(newUser.value.id).toBeDefined();
            expect(newUser.value.email).toBe(userRequest.EMAIL);
            expect(newUser.value.idLicence).toBe(userRequest.ID_LICENCE);
            expect(newUser.value.idSituation).toBe(userRequest.ID_SITUATION);
            expect(newUser.value.lastedPayment).toBe(
                userRequest.LASTED_PAYMENT,
            );
            expect(newUser.value.dueDate).toBeDefined();
        }
    });

    it('should be able deny creation of a user, case ID already exist', async () => {
        const usersRepo = new InMemoryUsersRepository();
        const licenceRepo = new InMemoryLicencesRepository();
        const createUser = new CreateUser(usersRepo, licenceRepo);

        const userRequest = {
            ID_USER: randomUUID(),
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 99,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        };

        const newUser = await createUser.execute(userRequest);
        if (newUser.isRight()) {
            usersRepo.items.push(newUser.value);
        }

        const user = await createUser.execute(userRequest);

        expect(user.isLeft()).toBe(true);
        if (user.isLeft()) {
            expect(user.value.message).toBe('ID already exist');
        }
    });

    it('should be able deny creation of a user, case EMAIL already exist', async () => {
        const usersRepo = new InMemoryUsersRepository();
        const licenceRepo = new InMemoryLicencesRepository();
        const createUser = new CreateUser(usersRepo, licenceRepo);

        const userRequest = {
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 99,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        };

        const newUser = await createUser.execute(userRequest);
        if (newUser.isRight()) {
            usersRepo.items.push(newUser.value);
        }

        const user = await createUser.execute(userRequest);
        expect(user.isLeft()).toBe(true);
        if (user.isLeft()) {
            expect(user.value.message).toBe('Email already registeresd');
        }
    });

    it('should be able deny creation of a use, case LICENCE not exist', async () => {
        const usersRepo = new InMemoryUsersRepository();
        const licenceRepo = new InMemoryLicencesRepository();
        const createUser = new CreateUser(usersRepo, licenceRepo);

        const userRequest = {
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@exemple.com',
            ID_LICENCE: 1,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        };

        const user = await createUser.execute(userRequest);
        expect(user.isLeft()).toBe(true);
        if (user.isLeft()) {
            expect(user.value.message).toBe('licence dont exist!');
        }
    });

    it('should be able deny creation of a use, case an DUE DATE invalid or smaller LASTPAYMENT', async () => {
        const usersRepo = new InMemoryUsersRepository();
        const licenceRepo = new InMemoryLicencesRepository();
        const createUser = new CreateUser(usersRepo, licenceRepo);

        const userRequest = {
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@exemple.com',
            ID_LICENCE: 99,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
            DUE_DATE: new Date('24-01-01'), // invalid date inserting
        };

        const user = await createUser.execute(userRequest);
        expect(user.isLeft()).toBe(true);
        if (user.isLeft()) {
            expect(user.value.message).toBe(
                'invalid date,plase, review your params',
            );
        }
    });
});
