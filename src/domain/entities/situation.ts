export interface SituationProps {
    ID_SITUATION?: number;
    DESCRIPTION: string;
}

export class Situation {
    constructor(private props: SituationProps) {
        this.props = props;
    }

    get id() {
        return this.props.ID_SITUATION;
    }

    get description() {
        return this.props.DESCRIPTION;
    }
    updateDescription(description: string) {
        this.props.DESCRIPTION = description;
    }
}
