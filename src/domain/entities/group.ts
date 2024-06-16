export interface GroupProps {
    ID_GROUP?: number;
    DESCRIPTION: string;
}

export class Group {
    constructor(private props: GroupProps) {
        this.props = props;
    }

    get id() {
        return this.props.ID_GROUP;
    }

    get description() {
        return this.props.DESCRIPTION;
    }
}
