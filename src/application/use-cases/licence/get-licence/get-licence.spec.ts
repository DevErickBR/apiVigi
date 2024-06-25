import { describe, expect, it } from 'vitest';
import { GetLicence } from './get-licence.ts';
import { InMemoryLicencesRepository } from '../../../../tests/repositories/in-memory-licences-repositories.ts';
import { Licence } from '../../../../domain/entities/licence.ts';

describe('Get Licence use case', () => {
    it('should be able dont find an licence, case ID not exist', async () => {
        const licenceRepository = new InMemoryLicencesRepository();
        const Licence = new GetLicence(licenceRepository);
        const result = await Licence.getById(1);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe('licence not exist with this ID');
        }
    });

    it('should be able dont find an licence, case description not exist', async () => {
        const licenceRepository = new InMemoryLicencesRepository();
        const Licence = new GetLicence(licenceRepository);
        const result = await Licence.getByDescription('test');
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe(
                'licence not exist with this description',
            );
        }
    });

    it('shound be able find an licence,if case ID exist', async () => {
        const licenceProps = new Licence({
            ID_LICENCE: 1,
            DURATION_DAYS: 30,
            NAME_LICENCE: 'test',
        });
        const licenceRepository = new InMemoryLicencesRepository();
        const licence = new GetLicence(licenceRepository);
        licenceRepository.save(licenceProps);

        const result = await licence.getById(1);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Licence);
        }
    });
    it('shound be able find an licence,if case description exist', async () => {
        const licenceProps = new Licence({
            ID_LICENCE: 1,
            DURATION_DAYS: 30,
            NAME_LICENCE: 'test',
        });
        const licenceRepository = new InMemoryLicencesRepository();
        const licence = new GetLicence(licenceRepository);
        licenceRepository.save(licenceProps);
        const result = await licence.getByDescription('test');
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Licence);
        }
    });
});
