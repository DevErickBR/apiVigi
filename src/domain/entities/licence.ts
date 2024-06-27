export interface LicenceProps {
    ID_LICENCE?: number;
    LICENCE: string;
    DURATION_DAYS: number;
}

export class Licence {
    constructor(private props: LicenceProps) {
        this.props = props;
    }

    public get id() {
        return this.props.ID_LICENCE;
    }

    public get name() {
        return this.props.LICENCE;
    }

    public get duration() {
        return this.props.DURATION_DAYS;
    }

    updateDuration(days: number) {
        this.props.DURATION_DAYS = days;
    }

    updateDescription(description: string) {
        this.props.LICENCE = description;
    }
}
