import { randomUUID } from 'crypto';
import { User } from '../../domain/entities/user';

interface CreateUserRequest {
    ID_USER?: string;
    NAME: string;
    LASTNAME: string;
    EMAIL: string;
    PASSWORD: string;
    ID_SITUATION: number;
    ID_LICENCE: number;
    LASTED_PAYMENT?: Date;
    DUE_DATE?: Date;
}

type CreateUserResponse = Promise<User | Error>;

export class CreateUse {
    constructor(private props: CreateUserRequest) {}

    execute(props: CreateUserRequest) {
        if (!props.ID_USER) {
            this.props.ID_USER = randomUUID();
        }
    }
}
