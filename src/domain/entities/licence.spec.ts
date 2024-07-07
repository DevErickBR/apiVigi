import { describe, it, expect } from 'vitest';
import { Licence } from './licence.ts';

describe('Create Licence with entities', () => {
    it('Shound be able create an licence', () => {
        const licencePros = {
            ID_LICENCE: 1,
            LICENCE: 'test',
            DURATION_DAYS: 30,
        };
        const licence = new Licence(licencePros);

        expect(licence).instanceOf(Licence);
        expect(licence.name).toBe(licencePros.LICENCE);
        expect(licence.id).toBe(licencePros.ID_LICENCE);
        expect(licence.duration).toBe(licencePros.DURATION_DAYS);
    });
});
