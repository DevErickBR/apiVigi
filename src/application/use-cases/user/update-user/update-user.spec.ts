import { UserRepository } from './../../../repositories/user-repository';
import { beforeAll, describe, expect, it } from 'vitest';
import { User } from '../../../../domain/entities/user';
import { UpdateUser } from './update-user';
import { randomUUID } from 'crypto';
import { InMemoryUsersRepository } from '../../../../tests/repositories/in-memory-users-repositories';

describe('Update an user', () => {
    const userProps = {
        ID_USER: randomUUID(),
        NAME: 'fulano',
        LASTNAME: 'cliclano',
        EMAIL: 'fulano@cliclano.com',
        ID_LICENCE: 99,
        ID_SITUATION: 1,
        PASSWORD: '12345678',
        LASTED_PAYMENT: new Date(),
    };

    let user: User;
    let userRepository: UserRepository;
    let updateUser: UpdateUser;

    beforeAll(() => {
        user = new User(userProps);
        userRepository = new InMemoryUsersRepository();
        updateUser = new UpdateUser(userRepository);
        userRepository.save(user);
    });

    it('should be able update the name of user', async () => {
        const result = await updateUser.execute({
            ID_USER: user.id,
            NAME: 'john',
        });
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.name).toBe('john');
        }
    });

    it('should be able update the lastname of user', async () => {
        const result = await updateUser.execute({
            ID_USER: user.id,
            LASTNAME: 'doe',
        });
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.lastname).toBe('doe');
        }
    });
});
