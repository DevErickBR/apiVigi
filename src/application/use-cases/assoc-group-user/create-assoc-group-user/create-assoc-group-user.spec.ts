import { AssocGroupUser } from '../../../../domain/entities/assoc-group-user.ts';
import { describe, it, expect, beforeEach } from 'vitest';
import { CreateAssocGroupUser } from './create-assoc-group-user.ts';
import { InMemoryAssocGroupUser } from '../../../../tests/repositories/in-memory-assoc-group-user.ts';
import { InMemoryUsersRepository } from '../../../../tests/repositories/in-memory-users-repositories.ts';
import { InMemoruGroupRepository } from '../../../../tests/repositories/in-memory-groups-repositories.ts';
import { User } from '../../../../domain/entities/user.ts';
import { randomUUID } from 'crypto';
import { Group } from '../../../../domain/entities/group.ts';

describe('Create an Association between user the group', () => {
    it('shound be able create an association', async () => {
        const assocGroupUserRepo = new InMemoryAssocGroupUser();
        const userRepo = new InMemoryUsersRepository();
        const groupRepo = new InMemoruGroupRepository();
        const assocGroupUser = new CreateAssocGroupUser(
            assocGroupUserRepo,
            userRepo,
            groupRepo,
        );

        const user = new User({
            ID_USER: randomUUID(),
            NAME: 'fulano',
            LASTNAME: 'cliclano',
            EMAIL: 'fulano@cliclano.com',
            ID_LICENCE: 99,
            ID_SITUATION: 1,
            PASSWORD: '12345678',
            LASTED_PAYMENT: new Date(),
        });

        const group = new Group({ DESCRIPTION: 'test', ID_GROUP: 1 });
        userRepo.save(user);
        groupRepo.save(group);

        const result = await assocGroupUser.execute({
            ID_USER: user.id,
            ID_GROUP: 1,
        });

        expect(result.isRight()).toBe(true);
        if (result.isRight()) {
            expect(result.value).instanceOf(AssocGroupUser);
            expect(result.value.getIdGroup).toBe(group.id);
            expect(result.value.getIdUser).toBe(user.id);
        }
    });
});

describe('Deny Create association between user the group', async () => {
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

    it('shound be able deny create an association, if case association already exist', async () => {
        userRepo.save(user);
        groupRepo.save(group);
        const asoc = await assocGroupUser.execute({
            ID_USER: user.id,
            ID_GROUP: 1,
        });
        if (asoc.isRight()) {
            assocGroupUserRepo.save(asoc.value);
        }
        const result = await assocGroupUser.execute({
            ID_USER: user.id,
            ID_GROUP: 1,
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('this association already exist');
        }
    });

    it('should be able deny an association, if group not found', async () => {
        userRepo.save(user);
        groupRepo.save(group);
        const result = await assocGroupUser.execute({
            ID_USER: user.id,
            ID_GROUP: 3,
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('this group not found');
        }
    });

    it('should be able deny an association, if user not found', async () => {
        userRepo.save(user);
        groupRepo.save(group);
        const result = await assocGroupUser.execute({
            ID_USER: 'not found',
            ID_GROUP: 1,
        });
        expect(result.isLeft()).toBe(true);
        if (result.isLeft()) {
            expect(result.value).instanceOf(Error);
            expect(result.value.message).toBe('this user not found');
        }
    });
});
