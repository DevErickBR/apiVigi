import { LicenceRepository } from './../repositories/licence-repository';
import { UserRepository } from './../repositories/user-repository';
import { beforeEach, describe, it, expect } from 'vitest';
import { AuthController } from './auth';
import { UserProps } from '../../domain/entities/user';
import { randomUUID } from 'crypto';
import { InMemoryUsersRepository } from '../../tests/repositories/in-memory-users-repositories';
import { CreateUser } from '../use-cases/user/create-user/create-user';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';
import { Licence } from '../../domain/entities/licence';
import { isJWT } from 'validator';

describe('generate jeson web token', () => {
    let userProps: UserProps;
    let createUser: CreateUser;
    let userRepository: UserRepository;
    let authControlle: AuthController;
    let licenceRepository: LicenceRepository;
    let licence: Licence;
    beforeEach(async () => {
        userRepository = new InMemoryUsersRepository();
        licenceRepository = new InMemoryLicencesRepository();
        licence = new Licence({
            ID_LICENCE: 1,
            DURATION_DAYS: 30,
            NAME_LICENCE: 'test',
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
        createUser = new CreateUser(userRepository, licenceRepository);
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
