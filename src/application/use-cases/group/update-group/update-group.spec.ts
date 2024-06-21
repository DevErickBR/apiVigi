import { UpdateGroup } from './update-group';
import { Group, GroupProps } from './../../../../domain/entities/group';
import { GroupRepository } from './../../../repositories/group-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoruGroupRepository } from '../../../../tests/repositories/in-memory-groups-repositories';

describe('Update an group', () => {
    let groupRepository: GroupRepository;
    let groupProps: GroupProps;
    let group: Group;
    let updateGroup: UpdateGroup;

    beforeEach(() => {
        groupProps = {
            DESCRIPTION: 'test',
            ID_GROUP: 1,
        };
        groupRepository = new InMemoruGroupRepository();
        group = new Group(groupProps);
        groupRepository.save(group);
        updateGroup = new UpdateGroup(groupRepository);
    });

    it('shoul be able update an group', async () => {
        const result = await updateGroup.execute(group.id!, {
            DESCRIPTION: 'new test',
        });
        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value.description).toBe('new test');
        }
    });
});

describe('Deny update an group', () => {
    let groupRepository: GroupRepository;
    let groupProps: GroupProps;
    let group: Group;
    let updateGroup: UpdateGroup;

    beforeEach(() => {
        groupProps = {
            DESCRIPTION: 'test',
            ID_GROUP: 1,
        };
        groupRepository = new InMemoruGroupRepository();
        group = new Group(groupProps);
        groupRepository.save(group);
        updateGroup = new UpdateGroup(groupRepository);
    });

    it('shoul be able deny update an group, if case description already in use', async () => {
        const outherGroup = new Group({
            DESCRIPTION: 'outher group',
            ID_GROUP: 4,
        });
        groupRepository.save(outherGroup);
        const result = await updateGroup.execute(group.id!, {
            DESCRIPTION: 'outher group',
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('description already in use');
        }
    });

    it('shoul be able deny update an group, if case group not found', async () => {
        const result = await updateGroup.execute(group.id! + 588, {
            DESCRIPTION: 'outher group',
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('group not found');
        }
    });
});
