import { describe, expect, it } from 'vitest';
import { FindDueDate } from './get-due-date';

describe('Calculate due date', () => {
    it('shound be able calculate due date', async () => {
        const nowDate = new Date();
        const duration = 40;
        const result = FindDueDate.CalcDueDate(nowDate, duration);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Date);
        }
    });

    it('shound be able deny an due date smaller lasted payment ', async () => {
        const result = FindDueDate.CalcDueDate(new Date(), -40);

        expect(result.isLeft()).toBe(true);
    });
    it('shound be able deny an due date if invalid date', async () => {
        const result = FindDueDate.CalcDueDate(new Date('24-01-01'), 40);
        expect(result.isLeft()).toBe(true);
    });
});
