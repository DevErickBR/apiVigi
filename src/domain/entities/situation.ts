export interface SituationProps {
    ID_SITUATION?: number;
    SITUATION: string;
}

export class Situation {
    constructor(private props: SituationProps) {
        this.props = props;
    }

    get id() {
        return this.props.ID_SITUATION;
    }

    get description() {
        return this.props.SITUATION;
    }

    updateDescription(description: string) {
        this.props.SITUATION = description;
    }
}
