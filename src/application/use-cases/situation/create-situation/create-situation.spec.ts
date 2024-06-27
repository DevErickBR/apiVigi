import { beforeEach, describe, expect, it } from 'vitest';
import {
    Situation,
    SituationProps,
} from '../../../../domain/entities/situation.ts';
import { CreateSituation } from './create-situation.ts';
import { InMemorySituationsRepository } from '../../../../tests/repositories/in-memory-situation-repositories.ts';

describe('Creat an situation', () => {
    it('should be able create an situation, case exist paramans id', async () => {
        const situationRepo = new InMemorySituationsRepository();
        const situationProps: SituationProps = {
            SITUATION: 'test',
            ID_SITUATION: 1,
        };

        const situation = new CreateSituation(situationRepo);
        const result = await situation.execute(situationProps);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Situation);
            expect(result.value.description).toBe(situationProps.SITUATION);
            expect(result.value.id).toBe(situationProps.ID_SITUATION);
        }
    });
    it('should be able create an situation, case not exist paramans id', async () => {
        const situationRepo = new InMemorySituationsRepository();
        const situationProps: SituationProps = {
            SITUATION: 'test',
        };

        const situation = new CreateSituation(situationRepo);
        const result = await situation.execute(situationProps);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Situation);
            expect(result.value.description).toBe(situationProps.SITUATION);
        }
    });
});

describe('Deny Creation an situation', () => {
    let situationRepo: InMemorySituationsRepository;
    let situationProps: SituationProps;
    let situation: CreateSituation;
    beforeEach(async () => {
        situationRepo = new InMemorySituationsRepository();
        situationProps = {
            SITUATION: 'test',
            ID_SITUATION: 1,
        };

        situation = new CreateSituation(situationRepo);
        const savedSituation = await situation.execute(situationProps);
        if (savedSituation.isRight()) {
            situationRepo.save(savedSituation.value);
        }
    });

    it('should be deny creation of an situation,if ID already registration', async () => {
        const result = await situation.execute(situationProps);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('ID already exist');
        }
    });
    it('should be deny creation of an situation,if ID already registration', async () => {
        situationProps = { SITUATION: 'test', ID_SITUATION: 3 };
        const result = await situation.execute(situationProps);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('description already exist');
        }
    });
});
