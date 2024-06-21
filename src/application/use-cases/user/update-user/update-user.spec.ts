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
        const result = await updateUser.execute(user.id, {
            NAME: 'john',
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.name).toBe('john');
        }
    });

    it('should be able update the lastname of user', async () => {
        const result = await updateUser.execute(user.id, {
            LASTNAME: 'doe',
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.lastname).toBe('doe');
        }
    });

    it('should be able update the pasword of user', async () => {
        const result = await updateUser.execute(user.id, {
            PASSWORD: '985623',
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.password).toBe('985623');
        }
    });

    it('should be able update the email of user', async () => {
        const result = await updateUser.execute(user.id, {
            EMAIL: 'exemple@email.com',
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.email).toBe('exemple@email.com');
        }
    });

    it('should be able update the licence of user', async () => {
        const result = await updateUser.execute(user.id, {
            ID_LICENCE: 20,
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.idLicence).toBe(20);
        }
    });

    it('should be able update the situation of user', async () => {
        const result = await updateUser.execute(user.id, {
            ID_SITUATION: 20,
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.idSituation).toBe(20);
        }
    });

    it('should be able update the payment of user', async () => {
        const result = await updateUser.execute(user.id, {
            LASTED_PAYMENT: new Date('2024-01-01'),
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.lastedPayment).toStrictEqual(
                new Date('2024-01-01'),
            );
        }
    });

    it('should be able update the due date of user', async () => {
        const result = await updateUser.execute(user.id, {
            DUE_DATE: new Date('2024-01-01'),
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.dueDate).toStrictEqual(new Date('2024-01-01'));
        }
    });
});

describe('Deny update an User', () => {
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

    it('should be able deny update user, if case email parameter already in use', async () => {
        const newUser = new User({
            ID_USER: randomUUID(),
            NAME: 'erick',
            LASTNAME: 'yan',
            EMAIL: 'erick@cliclano.com',
            ID_LICENCE: 99,
            ID_SITUATION: 1,
            PASSWORD: '12345678',
            LASTED_PAYMENT: new Date(),
        });
        userRepository.save(newUser);

        const result = await updateUser.execute(user.id, {
            EMAIL: 'erick@cliclano.com',
        });

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('email already in use');
        }
    });

    it('should be able deny update an user, if case user not fould', async () => {
        const result = await updateUser.execute(user.id + 5500, {
            EMAIL: 'erick@cliclano.com',
        });

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('user not found');
        }
    });
});
