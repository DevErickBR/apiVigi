import { describe, expect, it } from 'vitest';
import { Situation, SituationProps } from './situation.ts';

describe('Create an situation with entities', () => {
    it('should be able create an user', () => {
        const situationProps: SituationProps = {
            SITUATION: 'test',
            ID_SITUATION: 1,
        };

        const situation = new Situation(situationProps);
        expect(situation).instanceOf(Situation);
        expect(situation.description).toBe(situationProps.SITUATION);
        expect(situation.id).toBe(situationProps.ID_SITUATION);
    });
});
