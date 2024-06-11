import { describe, expect, it } from 'vitest';
import { FindDueDate } from './get-due-date';

describe('Calculate due date', () => {
    it('shound be able calculate due date', async () => {
        expect(FindDueDate.CalcDueDate(new Date(), 40)).resolves;
    });

    it('shound be able deny an due date smaller lasted payment ', async () => {
        expect(FindDueDate.CalcDueDate(new Date(), -40)).rejects;
    });
});
