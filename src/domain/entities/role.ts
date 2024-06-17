export interface RoleProps {
    ID_ROLE?: number;
    DESCRIPTION: string;
}

export class Role {
    constructor(private props: RoleProps) {}

    get id() {
        return this.props.ID_ROLE;
    }

    get description() {
        return this.props.DESCRIPTION;
    }
}
