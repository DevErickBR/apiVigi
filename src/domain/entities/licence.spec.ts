import { describe, it, expect } from 'vitest';
import { Licence } from './licence';

describe('Create Licence with entities', () => {
    it('Shound be able create an user', () => {
        const newLicence = Licence.create({
            ID_LICENCA: 1,
            DURACAO_DIAS: 30,
            NOME_LICENCA: 'teste',
        });

        expect(newLicence).instanceOf(Licence);
    });
});
