export interface AssocGroupUserProps {
    ID_GROUP: number;
    ID_USER: string;
}

export class AssocGroupUser {
    constructor(private props: AssocGroupUserProps) {
        this.props = props;
    }

    get getIdGroup() {
        return this.props.ID_GROUP;
    }

    get getIdUser() {
        return this.props.ID_USER;
    }
}
