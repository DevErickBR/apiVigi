export interface LicenceProps {
    ID_LICENCA: number;
    NOME_LICENCA: string;
    DURACAO_DIAS: number;
}

export class Licence {
    private props: LicenceProps;

    private constructor(props: LicenceProps) {
        this.props = props;
    }

    get getId() {
        return this.props.ID_LICENCA;
    }

    get getDuration() {
        return this.props.DURACAO_DIAS;
    }

    async create(props: LicenceProps) {
        const licence = new Licence(props);
        return licence;
    }
}
