import { describe, expect, it } from 'vitest';
import { GetLicence } from './get-licence';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';
import { Licence } from '../../domain/entities/licence';

describe('Get Licence use case', () => {
    it('should be able dont find an licence', async () => {
        const licenceRepository = new InMemoryLicencesRepository();
        const Licence = new GetLicence(licenceRepository);
        const result = await Licence.getLicence(1);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe('licence not exist');
        }
    });

    it('shound be able find an licence', async () => {
        const licenceProps = {
            ID_LICENCE: 1,
            DURATION_DAYS: 30,
            NAME_LICENCE: 'test',
        };
        const licenceRepository = new InMemoryLicencesRepository();
        const licence = new Licence({
            ID_LICENCE: 1,
            DURATION_DAYS: 30,
            NAME_LICENCE: 'test',
        });
        licenceRepository.licences.push(licence);
        const resultLicence = new GetLicence(licenceRepository);
        const result = await resultLicence.getLicence(licence.id!);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Licence);
            expect(result.value.name).toBe(licenceProps.NAME_LICENCE);
            expect(result.value.duration).toBe(licenceProps.DURATION_DAYS);
            expect(result.value.id).toBe(licenceProps.ID_LICENCE);
        }
    });
});
