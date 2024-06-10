import { describe, it, expect } from 'vitest';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';
import { Licence } from '../../domain/entities/licence';
import { GetLicence } from './get-licence';

describe('Get Licence with use case', () => {
    it('shoul be able find one licence', async () => {
        const licenceRepository = new InMemoryLicencesRepository();
        const licence = Licence.create({
            ID_LICENCA: 1,
            NOME_LICENCA: 'test',
            DURACAO_DIAS: 30,
        });

        licenceRepository.items.push(licence);

        const sut = new GetLicence(licenceRepository);
        const response = await sut.execute({
            ID_LICENCA: 1,
        });
        expect(response).instanceOf(Licence);
    });
});
