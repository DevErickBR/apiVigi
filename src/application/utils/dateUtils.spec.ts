import { describe, expect, it } from 'vitest';
import { DateUtils } from './dateUtils';

describe('Calculate due date', () => {
    it('shound be able calculate due date', async () => {
        const nowDate = new Date();
        const duration = 40;
        const result = DateUtils.getDueDate(nowDate, duration);

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Date);
        }
    });

    it('shound be able deny an due date if invalid date', async () => {
        const result = DateUtils.getDueDate(new Date('24-01-01'), 40);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe(
                'invalid date,plase, review your params',
            );
        }
    });

    it('shound be able deny an due date if smaller the lasted payment', async () => {
        const result = DateUtils.getDueDate(new Date('2024-01-01'), -40);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe(
                'not possible register due date shorter than the lasted payment',
            );
        }
    });
});
