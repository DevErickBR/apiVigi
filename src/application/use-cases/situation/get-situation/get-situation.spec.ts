import { beforeEach, describe, expect, it } from 'vitest';
import { InMemorySituationsRepository } from '../../../../tests/repositories/in-memory-situation-repositories.ts';
import {
    Situation,
    SituationProps,
} from '../../../../domain/entities/situation.ts';
import { CreateSituation } from '../create-situation/create-situation.ts';
import { GetSituation } from './get-situation.ts';

describe('Find an situation', async () => {
    let situationRepo: InMemorySituationsRepository;
    let situationProps: SituationProps;
    let situation: CreateSituation;
    let getSituation: GetSituation;
    beforeEach(async () => {
        situationRepo = new InMemorySituationsRepository();
        situationProps = {
            DESCRIPTION: 'test',
            ID_SITUATION: 1,
        };
        situation = new CreateSituation(situationRepo);
        getSituation = new GetSituation(situationRepo);
        const savedSituation = await situation.execute(situationProps);
        if (savedSituation.isRight()) {
            situationRepo.save(savedSituation.value);
        }
    });

    it('shoul be able find an situation, if id params exist', async () => {
        const result = await getSituation.getById(1);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Situation);
        }
    });
    it('shoul be able find an situation, if description params exist', async () => {
        const result = await getSituation.getByDescription('test');
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(Situation);
        }
    });

    it('shoul be able not find an situation,if case ID not exist', async () => {
        const result = await getSituation.getById(2);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe(
                'Situation not exist with this ID',
            );
        }
    });

    it('shoul be able not find an situation,if case description not exist', async () => {
        const result = await getSituation.getByDescription('test1');
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe(
                'Situation not exist with this description',
            );
        }
    });
});
