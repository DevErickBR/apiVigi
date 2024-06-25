import { it, describe, expect } from 'vitest';
import { InMemoruGroupRepository } from '../../../../tests/repositories/in-memory-groups-repositories.ts';
import { Group, GroupProps } from '../../../../domain/entities/group.ts';
import { CreateGroup } from './create-group.ts';

describe('Create an Group', async () => {
    it('should be able create an user', async () => {
        const groupRepo = new InMemoruGroupRepository();
        const createGroup = new CreateGroup(groupRepo);
        const response = await createGroup.execute({
            ID_GROUP: 1,
            DESCRIPTION: 'test',
        });

        expect(response.isRight()).toBe(true);
        if (response.isRight()) {
            expect(response.value).instanceOf(Group);
        }
    });

    it('shounl be able deny creat an user, if case ID already exist', async () => {
        const groupProps: GroupProps = {
            ID_GROUP: 1,
            DESCRIPTION: 'test',
        };
        const groupRepo = new InMemoruGroupRepository();
        const createGroup = new CreateGroup(groupRepo);
        const group = await createGroup.execute(groupProps);
        if (group.isRight()) {
            groupRepo.save(group.value);
        }

        const result = await createGroup.execute(groupProps);
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe('ID already exist');
        }
    });
    it('shounl be able deny creat an user, if case description already exist', async () => {
        const groupProps: GroupProps = {
            ID_GROUP: 1,
            DESCRIPTION: 'test',
        };
        const groupRepo = new InMemoruGroupRepository();
        const createGroup = new CreateGroup(groupRepo);
        const group = await createGroup.execute(groupProps);
        if (group.isRight()) {
            groupRepo.save(group.value);
        }

        const result = await createGroup.execute({
            ID_GROUP: 2,
            DESCRIPTION: 'test',
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value.message).toBe('description already exist');
        }
    });
});
