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

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Licence);
            expect(result.value.name).toBe(licenceProps.NAME_LICENCE);
            expect(result.value.id).toBe(licenceProps.ID_LICENCE);
            expect(result.value.duration).toBe(licenceProps.DURATION_DAYS);
        }
    });

    it('should be able deny creation an licence, case duration smaller than 0', async () => {
        const licenceProps = {
            ID_LICENCE: 1,
            NAME_LICENCE: 'teste',
            DURATION_DAYS: -3,
        };
        const licenceRepo = new InMemoryLicencesRepository();
        const licence = new CreateLicence(licenceRepo);
        const result = await licence.execute(licenceProps);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe(
                'not possible create Licence with duration smaller 0',
            );
        }
    });

    it('should be able deny creation an licence,if the id already exist', async () => {
        const licenceProps = {
            ID_LICENCE: 1,
            NAME_LICENCE: 'teste',
            DURATION_DAYS: 30,
        };
        const licenceRepo = new InMemoryLicencesRepository();
        const licence = new CreateLicence(licenceRepo);
        let result = await licence.execute(licenceProps);
        if (result.isRight()) {
            licenceRepo.licences.push(result.value);
        }
        result = await licence.execute(licenceProps);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe('ID already exist');
        }
    });

    it('should be able deny creation an licence,if the licence name already exist', async () => {
        const licenceProps = {
            ID_LICENCE: 3,
            NAME_LICENCE: 'teste',
            DURATION_DAYS: 30,
        };
        const licenceRepo = new InMemoryLicencesRepository();
        const licence = new CreateLicence(licenceRepo);
        let result = await licence.execute(licenceProps);
        if (result.isRight()) {
            licenceRepo.licences.push(result.value);
        }

        result = await licence.execute({
            ID_LICENCE: 5,
            NAME_LICENCE: 'teste',
            DURATION_DAYS: 30,
        });

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe(
                'the license name already exists',
            );
        }
    });
});
