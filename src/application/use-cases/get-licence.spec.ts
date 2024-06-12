import { describe, expect, it } from 'vitest';
import { GetLicence } from './get-licence';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';
import { Licence } from '../../domain/entities/licence';

describe('Get Licence use case', () => {
    it('should be able dont find an licence', async () => {
        const licenceRepository = new InMemoryLicencesRepository();
        const Licence = new GetLicence(licenceRepository);
        const result = await Licence.getLicence(1);
        expect(result).toBeNull();
    });

    it('shound be able find an licence', async () => {
        const licenceRepository = new InMemoryLicencesRepository();
        const licence = new Licence({
            ID_LICENCE: 1,
            DURATION_DAYS: 30,
            NAME_LICENCE: 'test',
        });
        licenceRepository.licences.push(licence);
        const resultLicence = new GetLicence(licenceRepository);
        const result = await resultLicence.getLicence(licence.id);

        expect(result).toEqual(licence);
    });
});
