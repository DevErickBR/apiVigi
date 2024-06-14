import { describe, expect, it } from 'vitest';
import { FindDueDate } from './get-due-date';

describe('Calculate due date', () => {
    it('shound be able calculate due date', async () => {
        const nowDate = new Date();
        const duration = 40;
        const result = await FindDueDate.CalcDueDate(nowDate, duration);

        expect(FindDueDate.CalcDueDate(nowDate, duration)).resolves;
        expect(result).instanceOf(Date);
    });

    it('shound be able deny an due date smaller lasted payment ', async () => {
        expect(FindDueDate.CalcDueDate(new Date(), -40)).rejects.toThrow(
            'cannot register due date smaller last payment',
        );
    });
    it('shound be able deny an due date if invalid date', async () => {
        expect(
            FindDueDate.CalcDueDate(new Date('24-01-01'), 40),
        ).rejects.toThrow('invalid date,plase, review your params');
    });
});
