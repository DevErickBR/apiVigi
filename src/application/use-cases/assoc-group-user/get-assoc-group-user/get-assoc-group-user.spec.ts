import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryAssocGroupUser } from '../../../../tests/repositories/in-memory-assoc-group-user';
import { AssocGroupUser } from '../../../../domain/entities/assoc-group-user';
import { InMemoryUsersRepository } from '../../../../tests/repositories/in-memory-users-repositories';
import { InMemoruGroupRepository } from '../../../../tests/repositories/in-memory-groups-repositories';
import { CreateAssocGroupUser } from '../create-assoc-group-user/create-assoc-group-user';
import { User } from '../../../../domain/entities/user';
import { Group } from '../../../../domain/entities/group';
import { randomUUID } from 'crypto';
import { GetAssocGroupUser } from './get-assoc-group-user';

describe('Searching an Association between user the group', () => {
    let assocGroupUserRepo: InMemoryAssocGroupUser;
    let userRepo: InMemoryUsersRepository;
    let groupRepo: InMemoruGroupRepository;
    let assocGroupUser: CreateAssocGroupUser;
    let user: User;
    let group: Group;

    beforeEach(() => {
        assocGroupUserRepo = new InMemoryAssocGroupUser();
        userRepo = new InMemoryUsersRepository();
        groupRepo = new InMemoruGroupRepository();
        assocGroupUser = new CreateAssocGroupUser(
            assocGroupUserRepo,
            userRepo,
            groupRepo,
        );

        user = new User({
            ID_USER: randomUUID(),
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 99,
            ID_SITUATION: 1,
            PASSWORD: '12345678',
            LASTED_PAYMENT: new Date(),
        });

        group = new Group({ DESCRIPTION: 'test', ID_GROUP: 1 });
    });

    it('shoul be able find an association', async () => {
        userRepo.save(user);
        groupRepo.save(group);
        const asoc = await assocGroupUser.execute({
            ID_USER: user.id,
            ID_GROUP: 1,
        });
        const getAssocGroupUser = new GetAssocGroupUser(assocGroupUserRepo);
        if (asoc.isRight()) {
            assocGroupUserRepo.save(asoc.value);
            const result = await getAssocGroupUser.execute(asoc.value);

            expect(result.isRight()).toBe(true);
            if (result.isRight()) {
                expect(result.value).instanceOf(AssocGroupUser);
            }
        }
    });

    it('shoul be able find an association', async () => {
        const getAssocGroupUser = new GetAssocGroupUser(assocGroupUserRepo);

        const result = await getAssocGroupUser.execute(
            new AssocGroupUser({ ID_GROUP: 6, ID_USER: 'fff' }),
        );

        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('not fould this association');
        }
    });
});
