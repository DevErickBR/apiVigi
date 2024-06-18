export interface AssocRoleUserProps {
    ID_ROLE: number;
    ID_USER: string;
}

export class AssocRoleUser {
    constructor(private props: AssocRoleUserProps) {
        this.props = props;
    }

    get getIdRole() {
        return this.props.ID_ROLE;
    }

    get getIdUser() {
        return this.props.ID_USER;
    }
}
