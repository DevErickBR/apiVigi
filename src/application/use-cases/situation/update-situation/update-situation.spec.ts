import { UpdateSituation } from './update-situation';
import { SituationRepository } from './../../../repositories/situation-repository';
import {
    Situation,
    SituationProps,
} from './../../../../domain/entities/situation';
import { beforeAll, describe, expect, it } from 'vitest';
import { InMemorySituationsRepository } from '../../../../tests/repositories/in-memory-situation-repositories';

describe('update an situation', () => {
    let situation: Situation;
    let situationRepository: SituationRepository;
    let situationProps: SituationProps;
    let updateSituation: UpdateSituation;

    beforeAll(() => {
        situationProps = { DESCRIPTION: 'new test', ID_SITUATION: 5 };
        situation = new Situation(situationProps);
        situationRepository = new InMemorySituationsRepository();
        updateSituation = new UpdateSituation(situationRepository);
        situationRepository.save(situation);
    });

    it('should be able update description of the situation', async () => {
        const result = await updateSituation.execute(situation.id!, {
            DESCRIPTION: 'new test',
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.description).toBe('new test');
        }
    });
});
