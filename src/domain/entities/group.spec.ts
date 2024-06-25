import { describe, expect, it } from 'vitest';
import { Group, GroupProps } from './group.ts';

describe('Create an group with entities', () => {
    it('should be able create an Group', () => {
        const groupProps: GroupProps = {
            ID_GROUP: 1,
            DESCRIPTION: 'test',
        };

        const group = new Group(groupProps);

        expect(group).instanceOf(Group);
        expect(group.description).toBe(groupProps.DESCRIPTION);
        expect(group.id).toBe(groupProps.ID_GROUP);
    });
});
