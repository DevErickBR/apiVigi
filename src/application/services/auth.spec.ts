import { Situation } from './../../domain/entities/situation.ts';
import { SituationRepository } from './../repositories/situation-repository.ts';
import { LicenceRepository } from './../repositories/licence-repository.ts';
import { UserRepository } from './../repositories/user-repository.ts';
import { beforeEach, describe, it, expect } from 'vitest';
import { AuthController } from './auth.ts';
import { UserProps } from '../../domain/entities/user.ts';
import { randomUUID } from 'crypto';
import { InMemoryUsersRepository } from '../../tests/repositories/in-memory-users-repositories.ts';
import { CreateUser } from '../use-cases/user/create-user/create-user.ts';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories.ts';
import { Licence } from '../../domain/entities/licence.ts';
import { isJWT } from 'validator';
import { InMemorySituationsRepository } from '../../tests/repositories/in-memory-situation-repositories.ts';

describe('generate jeson web token', () => {
    let userProps: UserProps;
    let createUser: CreateUser;
    let userRepository: UserRepository;
    let authControlle: AuthController;
    let licenceRepository: LicenceRepository;
    let licence: Licence;
    let situationRepository: SituationRepository;
    let situation: Situation;
    beforeEach(async () => {
        userRepository = new InMemoryUsersRepository();
        licenceRepository = new InMemoryLicencesRepository();
        licence = new Licence({
            ID_LICENCE: 1,
            DURATION_DAYS: 30,
            LICENCE: 'test',
        });
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
        licenceRepository.save(licence);
        situationRepository = new InMemorySituationsRepository();
        situation = new Situation({ SITUATION: 'test', ID_SITUATION: 1 });
        situationRepository.save(situation);
        createUser = new CreateUser(
            userRepository,
            licenceRepository,
            situationRepository,
        );
        const user = await createUser.execute(userProps);
        if (user.isRight()) {
            userRepository.save(user.value);
        }
        authControlle = new AuthController(userRepository);
    });

    it('shloud be able create an token', async () => {
        const result = await authControlle.Authenticate(
            userProps.EMAIL,
            userProps.PASSWORD,
        );
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(isJWT(result.value.token)).toBe(true);
        }
    });
});
