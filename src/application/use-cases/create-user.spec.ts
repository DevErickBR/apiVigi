import { it, describe, expect } from 'vitest';
import { randomUUID } from 'crypto';
import { CreateUser } from './create-user';
import { InMemoryUsersRepository } from '../../tests/repositories/in-memory-users-repositories';
import { User } from '../../domain/entities/user';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';

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
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
        };

        const newUser = await createUser.execute(userRequest);
        expect(newUser).toBeInstanceOf(User);
        expect(newUser.name).toBe(userRequest.NAME);
        expect(newUser.id).toBe(userRequest.ID_USER);
        expect(newUser.email).toBe(userRequest.EMAIL);
        expect(newUser.idLicence).toBe(userRequest.ID_LICENCE);
        expect(newUser.idSituation).toBe(userRequest.ID_SITUATION);
        expect(newUser.lastedPayment).toBe(userRequest.LASTED_PAYMENT);
        expect(newUser.dueDate).toBeDefined();
    });

    it('should be able create an user case not inform props id', async () => {
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
        expect(newUser).toBeInstanceOf(User);
        expect(newUser.name).toBe(userRequest.NAME);
        expect(newUser.id).toBeDefined();
        expect(newUser.email).toBe(userRequest.EMAIL);
        expect(newUser.idLicence).toBe(userRequest.ID_LICENCE);
        expect(newUser.idSituation).toBe(userRequest.ID_SITUATION);
        expect(newUser.lastedPayment).toBe(userRequest.LASTED_PAYMENT);
        expect(newUser.dueDate).toBeDefined();
    });

    it('should be able deny creation of a user case ID already exist', async () => {
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
        usersRepo.items.push(newUser);

        expect(
            async () => await createUser.execute(userRequest),
        ).rejects.toThrow('ID already exist');
    });
});
