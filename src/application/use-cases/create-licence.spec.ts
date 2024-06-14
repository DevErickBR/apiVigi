import { it, describe, expect } from 'vitest';
import { CreateLicence } from './create-licence';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';
import { Licence } from '../../domain/entities/licence';

describe('Create Licence with use case', () => {
    it('should be able create an licence', async () => {
        const licenceProps = {
            ID_LICENCE: 1,
            NAME_LICENCE: 'teste',
            DURATION_DAYS: 30,
        };
        const licenceRepo = new InMemoryLicencesRepository();
        const licence = new CreateLicence(licenceRepo);
        const result = await licence.execute(licenceProps);

        expect(result).instanceOf(Licence);
        expect(result.name).toBe(licenceProps.NAME_LICENCE);
        expect(result.id).toBe(licenceProps.ID_LICENCE);
        expect(result.duration).toBe(licenceProps.DURATION_DAYS);
    });

    it('should be able deny creation an licence, case duration smaller 0', async () => {
        const licenceProps = {
            ID_LICENCE: 1,
            NAME_LICENCE: 'teste',
            DURATION_DAYS: -3,
        };
        const licenceRepo = new InMemoryLicencesRepository();
        const licence = new CreateLicence(licenceRepo);

        expect(async () => await licence.execute(licenceProps)).rejects.toThrow(
            'not possible create Licence with duration smaller 0',
        );
    });
    it('should be able deny creation an licence,if the id already exist', async () => {
        const licenceProps = {
            ID_LICENCE: 1,
            NAME_LICENCE: 'teste',
            DURATION_DAYS: 30,
        };
        const licenceRepo = new InMemoryLicencesRepository();
        const licence = new CreateLicence(licenceRepo);
        const result = await licence.execute(licenceProps);
        licenceRepo.licences.push(result);

        expect(async () => await licence.execute(licenceProps)).rejects.toThrow(
            'ID already exist',
        );
    });
    it('should be able deny creation an licence,if the licence name already exist', async () => {
        const licenceProps = {
            ID_LICENCE: 3,
            NAME_LICENCE: 'teste',
            DURATION_DAYS: 30,
        };
        const licenceRepo = new InMemoryLicencesRepository();
        const licence = new CreateLicence(licenceRepo);
        const result = await licence.execute(licenceProps);
        licenceRepo.licences.push(result);

        expect(
            async () =>
                await licence.execute({
                    DURATION_DAYS: 30,
                    NAME_LICENCE: 'test',
                    ID_LICENCE: 1,
                }),
        ).rejects.toThrow('the license name already exists');
    });
});
