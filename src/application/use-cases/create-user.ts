import { LicenceRepository } from './../repositories/licence-repository';
import { UserRepository } from './../repositories/user-repository';
import { randomUUID } from 'crypto';
import { User, UserProps } from '../../domain/entities/user';
import { FindDueDate } from '../utils/get-due-date';

interface CreateUserRequest {
    ID_USER?: string;
    NAME: string;
    LASTNAME: string;
    EMAIL: string;
    PASSWORD: string;
    ID_SITUATION: number;
    ID_LICENCE: number;
    LASTED_PAYMENT: Date;
    DUE_DATE?: Date;
}

type CreateUserResponse = Promise<User>;

export class CreateUser {
    constructor(
        private userRepository: UserRepository,
        private licenceRepository: LicenceRepository,
    ) {}

    async execute(props: CreateUserRequest): CreateUserResponse {
        if (props.ID_USER) {
            if (await this.userRepository.findById(props.ID_USER)) {
                throw new Error('ID already exist');
            }
        }
        if (props.EMAIL) {
            if (await this.userRepository.findByEmail(props.EMAIL)) {
                throw new Error('Email already registeresd');
            }
        }

        if (props.DUE_DATE) {
            if (isNaN(props.DUE_DATE.getDate())) {
                throw new Error('invalid date,plase, review your params');
            }
        }

        const licence = await this.licenceRepository.findById(props.ID_LICENCE);

        if (!licence) {
            throw new Error('licence dont exist!');
        }
        const dueDate = await FindDueDate.CalcDueDate(
            props.LASTED_PAYMENT,
            licence.duration,
        );

        const userId = props.ID_USER || randomUUID();

        const userProps: UserProps = {
            ID_USER: userId,
            DUE_DATE: dueDate.toString || new Date(),
            ...props,
        };

        const user = new User(userProps);

        return user;
    }
}
