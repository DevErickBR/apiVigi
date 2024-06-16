import { Group } from '../../domain/entities/group';
import { InMemoruGroupRepository } from '../../tests/repositories/in-memory-groups-repositories';
import { GetGroup } from './get-group';
import { it, describe, expect } from 'vitest';

describe('getting groups with use case', () => {
    it('shoul be able not find a group,if case ID not exist', async () => {
        const groupRepo = new InMemoruGroupRepository();
        const group = new GetGroup(groupRepo);
        const result = await group.getById(1);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe('not found group with this ID');
        }
    });

    it('shoul be able not find a group,if case description not exist', async () => {
        const groupRepo = new InMemoruGroupRepository();
        const group = new GetGroup(groupRepo);
        const result = await group.getByName('test');
        expect(result.isLeft()).toBe(true);

        if (result.isLeft()) {
            expect(result.value.message).toBe(
                'not found group with this description',
            );
        }
    });

    it('shold be able find an group, if case ID exist', async () => {
        const groupRepo = new InMemoruGroupRepository();
        const group = new GetGroup(groupRepo);
        const newGroup = new Group({ DESCRIPTION: 'test', ID_GROUP: 1 });
        groupRepo.save(newGroup);
        const result = await group.getById(1);
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceof(Group);
        }
    });
    it('shold be able find an group, if case description exist', async () => {
        const groupRepo = new InMemoruGroupRepository();
        const group = new GetGroup(groupRepo);
        const newGroup = new Group({ DESCRIPTION: 'test', ID_GROUP: 1 });
        groupRepo.save(newGroup);
        const result = await group.getByName('test');
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceof(Group);
        }
    });
});
