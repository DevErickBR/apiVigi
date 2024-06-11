export interface LicenceProps {
    ID_LICENCE: number;
    NAME_LICENCE: string;
    DURATION_DAYS: number;
}

export class Licence {
    constructor(private props: LicenceProps) {
        this.props = props;
    }

    get id() {
        return this.props.ID_LICENCE;
    }

    get name() {
        return this.props.NAME_LICENCE;
    }

    get duration() {
        return this.props.DURATION_DAYS;
    }

    updateDuration(days: number) {
        this.props.DURATION_DAYS = days;
    }

    updateName(name: string) {
        this.props.NAME_LICENCE = name;
    }
}
