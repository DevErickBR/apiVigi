import { describe, it } from 'vitest';
import { Hash } from './hash-password.ts';

describe('hash password', () => {
    it('should be able encrtpy an password', async () => {
        const password = '1234';
        const hashPassword = await Hash.execute(password);
        return hashPassword;
    });
});
