import { SituationRepository } from './../../../repositories/situation-repository';
import { right } from '../../../../domain/errors/either';
import { LicenceRepository } from '../../../repositories/licence-repository';
import { UserRepository } from '../../../repositories/user-repository';
import { randomUUID } from 'crypto';
import { User, UserProps } from '../../../../domain/entities/user';
import { DateUtils } from '../../../utils/dateUtils';
import { Either, left } from '../../../../domain/errors/either';
import { Hash } from '../../../../security/hash-password';

export interface CreateUserRequest {
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

type Response = Either<Error, User>;

export class CreateUser {
    constructor(
        private userRepository: UserRepository,
        private licenceRepository: LicenceRepository,
        private situationRepository: SituationRepository,
    ) {}

    async execute(props: CreateUserRequest): Promise<Response> {
        if (props.ID_USER) {
            if (await this.userRepository.findById(props.ID_USER)) {
                return left(new Error('ID already exist'));
            }
        }
        if (props.EMAIL) {
            if (await this.userRepository.findByEmail(props.EMAIL)) {
                return left(new Error('Email already registeresd'));
            }
        }

        if (props.DUE_DATE) {
            if (isNaN(props.DUE_DATE.getDate())) {
                return left(
                    new Error('invalid date,plase, review your params'),
                );
            }
        }

        const licence = await this.licenceRepository.findById(props.ID_LICENCE);

        if (!licence) {
            return left(new Error('licence dont exist!'));
        }
        const dueDate = DateUtils.getDueDate(
            props.LASTED_PAYMENT,
            licence!.duration,
        );

        if (dueDate.isLeft()) {
            return left(dueDate.value);
        }

        const situation = await this.situationRepository.findById(
            props.ID_SITUATION,
        );

        if (!situation) {
            return left(new Error('situation not exist'));
        }

        const userId = props.ID_USER || randomUUID();
        const hashedPassword = await Hash.execute(props.PASSWORD);

        const userProps: UserProps = {
            ID_USER: userId,
            DUE_DATE: dueDate.value,
            PASSWORD: hashedPassword,
            NAME: props.NAME,
            LASTNAME: props.LASTNAME,
            EMAIL: props.EMAIL,
            ID_LICENCE: licence.id!,
            ID_SITUATION: situation.id!,
            LASTED_PAYMENT: props.LASTED_PAYMENT,
        };

        const user = new User(userProps);
        this.userRepository.save(user);
        return right(user);
    }
}
