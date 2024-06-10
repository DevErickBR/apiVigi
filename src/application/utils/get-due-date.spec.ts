import { describe, expect, it } from 'vitest';
import { FindDueDate } from './get-due-date';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';
import { Licence } from '../../domain/entities/licence';

describe('Calculate due date', () => {
    it('shound be able calculate due date', async () => {
        const licencesRepository = new InMemoryLicencesRepository();
        const newLicence = Licence.create({
            ID_LICENCA: 1,
            DURACAO_DIAS: 30,
            NOME_LICENCA: 'teste',
        });
        licencesRepository.items.push(newLicence);

        const sut = new FindDueDate(licencesRepository);
        const expectData = await sut.calcDueDate(new Date(), 1);

        expect(await sut.calcDueDate(new Date(), 1)).toEqual(expectData);
    });

    it('shound be able reject due date before start date', async () => {
        const licencesRepository = new InMemoryLicencesRepository();
        const newLicence = Licence.create({
            ID_LICENCA: 1,
            DURACAO_DIAS: -90,
            NOME_LICENCA: 'teste',
        });

        licencesRepository.items.push(newLicence);

        const sut = new FindDueDate(licencesRepository);

        expect(sut.calcDueDate(new Date(), 1)).rejects.toThrow(
            'Due Date Invalid',
        );
    });
});
