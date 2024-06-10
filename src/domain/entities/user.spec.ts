import { expect, describe, it } from 'vitest';
import { User } from './user';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';
import { Licence } from './licence';

describe('Create User with entities', () => {
    it('creat an user', () => {
        const licenceRepository = new InMemoryLicencesRepository();
        const licence = Licence.create({
            ID_LICENCA: 1,
            NOME_LICENCA: 'test',
            DURACAO_DIAS: 30,
        });

        licenceRepository.items.push(licence);

        console.log(licenceRepository.items);
        const user = new User(
            {
                NOME: 'fulano',
                SOBRENOME: 'ciclano',
                EMAIL: 'fulano@email.com',
                ID_GRUPO: 1,
                ID_LICENCA: 1,
                ID_SITUACAO: 1,
                SENHA: '123456',
            },
            licenceRepository,
        );

        expect(user).instanceOf(User);
    });

    it('cannot create user an with due date before start date', async () => {
        const licenceRepository = new InMemoryLicencesRepository();
        const licence = Licence.create({
            ID_LICENCA: 1,
            NOME_LICENCA: 'test',
            DURACAO_DIAS: -30,
        });

        licenceRepository.items.push(licence);

        const startDate = new Date();
        const expectDate = new Date();
        const dueDate = new Date(expectDate.setDate(expectDate.getDate() - 20));

        expect(
            () =>
                new User(
                    {
                        NOME: 'fulano',
                        SOBRENOME: 'ciclano',
                        EMAIL: 'fulano@email.com',
                        ID_GRUPO: 1,
                        ID_LICENCA: 1,
                        ID_SITUACAO: 1,
                        SENHA: '123456',
                        ULTIMO_PAGAMENTO_LICENCA: startDate,
                        PROXIMO_VENCIMENTO_LICENCA: dueDate,
                    },
                    licenceRepository,
                ),
        ).rejects.toThrow('cannot register due date before date start');
    });
});
