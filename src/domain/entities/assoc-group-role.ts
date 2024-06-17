interface AssocGroupRoleProps {
    ID_ROLE: number;
    ID_GROUP: number;
}

export class AssocGroupRole {
    constructor(private props: AssocGroupRoleProps) {
        this.props = props;
    }

    get getIdRole() {
        return this.props.ID_ROLE;
    }

    get getIdGroup() {
        return this.props.ID_GROUP;
    }
}
