import { it, describe, expect } from 'vitest';
import { CreateUser } from './create-user';
import { User } from '../../domain/entities/user';
import { InMemoryUsersRepository } from '../../tests/repositories/in-memory-users-repositories';

describe('Create user with use case', () => {
    it('should be able to create a new user', async () => {
        const usersRepository = new InMemoryUsersRepository();

        const sut = new CreateUser(usersRepository);
        const response = await sut.execute({
            NOME: 'fulano',
            SOBRENOME: 'ciclano',
            EMAIL: 'fulano@email.com',
            ID_GRUPO: 1,
            ID_LICENCA: 1,
            ID_SITUACAO: 1,
            SENHA: '123456',
        });

        expect(response).instanceOf(User);
    });

    it('should be able to deny create user if email in use', async () => {
        const usersRepository = new InMemoryUsersRepository();

        const user = User.create({
            NOME: 'fulano',
            SOBRENOME: 'ciclano',
            EMAIL: 'fulano@email.com',
            ID_GRUPO: 1,
            ID_LICENCA: 1,
            ID_SITUACAO: 1,
            SENHA: '123456',
        });
        usersRepository.items.push(user);

        const sut = new CreateUser(usersRepository);

        await expect(
            sut.execute({
                NOME: 'fulano',
                SOBRENOME: 'ciclano',
                EMAIL: 'fulano@email.com',
                ID_GRUPO: 1,
                ID_LICENCA: 1,
                ID_SITUACAO: 1,
                SENHA: '123456',
            }),
        ).rejects.toThrow('not possible create user, because email in use.');
    });
});
