import { describe, it, expect } from 'vitest';
import { Licence } from './licence';

describe('Create Licence with entities', () => {
    it('Shound be able create an licence', () => {
        const licence = new Licence({
            ID_LICENCE: 1,
            NAME_LICENCE: 'test',
            DURATION_DAYS: 30,
        });

        expect(licence).instanceOf(Licence);
    });
});
