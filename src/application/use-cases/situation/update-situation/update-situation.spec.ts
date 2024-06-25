import { UpdateSituation } from './update-situation.ts';
import { SituationRepository } from './../../../repositories/situation-repository.ts';
import {
    Situation,
    SituationProps,
} from './../../../../domain/entities/situation.ts';
import { beforeAll, describe, expect, it } from 'vitest';
import { InMemorySituationsRepository } from '../../../../tests/repositories/in-memory-situation-repositories.ts';

describe('update an situation', () => {
    let situation: Situation;
    let situationRepository: SituationRepository;
    let situationProps: SituationProps;
    let updateSituation: UpdateSituation;

    beforeAll(() => {
        situationProps = { DESCRIPTION: 'test', ID_SITUATION: 5 };
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

describe('Deny update an situation', () => {
    let situation: Situation;
    let situationRepository: SituationRepository;
    let situationProps: SituationProps;
    let updateSituation: UpdateSituation;

    beforeAll(() => {
        situationProps = { DESCRIPTION: 'test', ID_SITUATION: 5 };
        situation = new Situation(situationProps);
        situationRepository = new InMemorySituationsRepository();
        updateSituation = new UpdateSituation(situationRepository);
        situationRepository.save(situation);
    });

    it('should be able deny update description of the situation, if case description already in use', async () => {
        const result = await updateSituation.execute(situation.id!, {
            DESCRIPTION: 'test',
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe('description already in use');
        }
    });

    it('should be able deny update description of the situation, if case description not found', async () => {
        const result = await updateSituation.execute(situation.id! + 503, {
            DESCRIPTION: 'test',
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe('situation not found');
        }
    });
});
