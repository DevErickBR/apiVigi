import { LicenceRepository } from './../../../repositories/licence-repository.ts';
import {
    Licence,
    LicenceProps,
} from './../../../../domain/entities/licence.ts';
import { UpdateLicence } from './update-licence.ts';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryLicencesRepository } from '../../../../tests/repositories/in-memory-licences-repositories.ts';

describe('Update an Licence', () => {
    let updateLicence: UpdateLicence;
    let licence: Licence;
    let licenceRepository: LicenceRepository;
    let licenceProps: LicenceProps;

    beforeEach(() => {
        licenceProps = {
            DURATION_DAYS: 30,
            NAME_LICENCE: 'test',
            ID_LICENCE: 1,
        };

        licence = new Licence(licenceProps);
        licenceRepository = new InMemoryLicencesRepository();
        licenceRepository.save(licence);
        updateLicence = new UpdateLicence(licenceRepository);
    });

    it('should be able update the duration of the licence', async () => {
        const result = await updateLicence.execute(licence.id!, {
            DURATION_DAYS: 20,
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.duration).toBe(20);
            expect(result.value.name).toBe('test');
        }
    });

    it('should be able update the description of the licence', async () => {
        const result = await updateLicence.execute(licence.id!, {
            NAME_LICENCE: 'new test',
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.name).toBe('new test');
            expect(result.value.duration).toBe(30);
        }
    });
});

describe('Deny update an Licence', () => {
    let updateLicence: UpdateLicence;
    let licence: Licence;
    let licenceRepository: LicenceRepository;
    let licenceProps: LicenceProps;

    beforeEach(() => {
        licenceProps = {
            DURATION_DAYS: 30,
            NAME_LICENCE: 'test',
            ID_LICENCE: 1,
        };

        licence = new Licence(licenceProps);
        licenceRepository = new InMemoryLicencesRepository();
        licenceRepository.save(licence);
        updateLicence = new UpdateLicence(licenceRepository);
    });

    it('should be able deny update licence, if case the description already in use', async () => {
        const outherLicence = new Licence({
            DURATION_DAYS: 20,
            NAME_LICENCE: 'outher licence',
            ID_LICENCE: 5,
        });
        licenceRepository.save(outherLicence);

        const result = await updateLicence.execute(licence.id!, {
            NAME_LICENCE: 'outher licence',
        });

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('description already in use');
        }
    });

    it('should be able deny update licence, if case licence not fould', async () => {
        const result = await updateLicence.execute(licence.id! + 582, {
            NAME_LICENCE: 'outher licence',
        });

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('licence not fould');
        }
    });

    it('should be able deny update licence, if case duration smaller 0', async () => {
        const result = await updateLicence.execute(licence.id!, {
            DURATION_DAYS: -20,
        });

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe(
                'duration invalid! duration less than 0 not accept',
            );
        }
    });
});
