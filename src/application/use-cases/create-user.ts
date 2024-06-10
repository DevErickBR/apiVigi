import { UserEmailRepository } from './../repositories/user-email-repository';
import { User } from '../../domain/entities/user';

interface CreateUserRequest {
    ID_USUARIO?: number;
    NOME: string;
    SOBRENOME: string;
    EMAIL: string;
    ID_GRUPO: number;
    ID_LICENCA: number;
    ID_SITUACAO: number;
    ULTIMO_PAGAMENTO_LICENCA?: Date;
    PROXIMO_VENCIMENTO_LICENCA?: Date;
    SENHA: string;
}

type CreateUserResponse = Promise<User | null>;

export class CreateUser {
    constructor(private userEmailRepository: UserEmailRepository) {}

    async execute(props: CreateUserRequest): CreateUserResponse {
        const email = await this.userEmailRepository.findByEmail(props.EMAIL);

        if (email) {
            throw new Error('not possible create user, because email in use.');
        }

        const user = User.create(props);
        return user;
    }
}
