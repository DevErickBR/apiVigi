import { Licence } from './../../../../domain/entities/licence.ts';
import { Situation } from './../../../../domain/entities/situation.ts';
import { LicenceRepository } from './../../../repositories/licence-repository.ts';
import { SituationRepository } from './../../../repositories/situation-repository.ts';
import { it, describe, expect, beforeEach } from 'vitest';
import { randomUUID } from 'crypto';
import { CreateUser, CreateUserRequest } from './create-user.ts';
import { InMemoryUsersRepository } from '../../../../tests/repositories/in-memory-users-repositories.ts';
import { InMemoryLicencesRepository } from '../../../../tests/repositories/in-memory-licences-repositories.ts';
import { UserRepository } from '../../../repositories/user-repository.ts';
import { InMemorySituationsRepository } from '../../../../tests/repositories/in-memory-situation-repositories.ts';
import { Hash } from '../../../../security/hash-password.ts';
import { User } from '../../../../domain/entities/user.ts';

describe('Create user with use case', () => {
    let usersRepo: UserRepository;
    let licenceRepo: LicenceRepository;
    let situationRepo: SituationRepository;
    let createUser: CreateUser;
    let userRequest: CreateUserRequest;
    let situation: Situation;
    let licence: Licence;

    beforeEach(async () => {
        usersRepo = new InMemoryUsersRepository();
        licenceRepo = new InMemoryLicencesRepository();
        situationRepo = new InMemorySituationsRepository();
        createUser = new CreateUser(usersRepo, licenceRepo, situationRepo);
        situation = new Situation({ SITUATION: 'test', ID_SITUATION: 1 });
        licence = new Licence({
            DURATION_DAYS: 30,
            LICENCE: 'test',
            ID_LICENCE: 99,
        });
        situationRepo.save(situation);
        licenceRepo.save(licence);
    });

    it('should be able create an user', async () => {
        userRequest = {
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
                await Hash.isVerifyPassword(
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
        userRequest = {
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
                await Hash.isVerifyPassword(
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
        userRequest = {
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
            usersRepo.save(newUser.value);
        }

        const user = await createUser.execute(userRequest);

        expect(user.isLeft()).toBe(true);
        if (user.isLeft()) {
            expect(user.value.message).toBe('ID already exist');
        }
    });

    it('should be able deny creation of a user, case EMAIL already exist', async () => {
        userRequest = {
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
            usersRepo.save(newUser.value);
        }

        const user = await createUser.execute(userRequest);
        expect(user.isLeft()).toBe(true);
        if (user.isLeft()) {
            expect(user.value.message).toBe('Email already registeresd');
        }
    });

    it('should be able deny creation of a use, case LICENCE not exist', async () => {
        userRequest = {
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

    it('should be able deny creation of a use, case an DUE DATE invalid', async () => {
        userRequest = {
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
        console.log(user);
        expect(user.isLeft()).toBe(true);
        if (user.isLeft()) {
            expect(user.value.message).toBe(
                'invalid date,plase, review your params',
            );
        }
    });
    it('should be able deny creation of a use, case an DUE DATE  smaller LASTPAYMENT', async () => {
        licence = new Licence({
            DURATION_DAYS: -50,
            LICENCE: 'new teste',
            ID_LICENCE: 988,
        });

        licenceRepo.save(licence);
        userRequest = {
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@exemple.com',
            ID_LICENCE: 988,
            ID_SITUATION: 1,
            PASSWORD: '123456789',
            LASTED_PAYMENT: new Date(),
            DUE_DATE: new Date('2024-01-01'),
        };

        const user = await createUser.execute(userRequest);
        expect(user.isLeft()).toBe(true);
        if (user.isLeft()) {
            expect(user.value.message).toBe(
                'not possible register due date shorter than the lasted payment',
            );
        }
    });
});
