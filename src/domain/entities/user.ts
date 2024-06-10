import { LicenceRepository } from './../../application/repositories/licence-duration';
import { FindDueDate } from '../../application/utils/get-due-date';
import { InMemoryLicencesRepository } from '../../tests/repositories/in-memory-licences-repositories';

export interface UserProps {
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

export class User {
    constructor(
        private props: UserProps,
        private licenceRepository: LicenceRepository,
    ) {}

    get email() {
        return this.props.EMAIL;
    }

    async create(props: UserProps) {
        const licenceRepo = new InMemoryLicencesRepository();
        const licence = await this.licenceRepository.findById(props.ID_LICENCA);

        if (!licence) {
            throw new Error('user not on licence');
        }
        const ultimoPagLicenca = props.ULTIMO_PAGAMENTO_LICENCA ?? new Date();

        const findDueDate = new FindDueDate(licenceRepo);
        const dueDate = await findDueDate.calcDueDate(
            ultimoPagLicenca,
            props.ID_LICENCA,
        );

        if (!dueDate) {
            throw new Error('Date Null!');
        }

        const proximoVencimentoLicenca =
            props.PROXIMO_VENCIMENTO_LICENCA ?? dueDate;

        if (proximoVencimentoLicenca <= ultimoPagLicenca) {
            throw new Error('cannot register due date before date start');
        }

        const user = new User(
            {
                ...props,
            },
            licenceRepo,
        );

        return user;
    }
}
