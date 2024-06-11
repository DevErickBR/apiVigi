export interface UserProps {
    ID_USER: string;
    NAME: string;
    LASTNAME: string;
    EMAIL: string;
    PASSWORD: string;
    ID_SITUATION: number;
    ID_LICENCE: number;
    LASTED_PAYMENT: Date;
    DUE_DATE?: Date;
}

export class User {
    private props: UserProps;

    constructor(props: UserProps) {
        this.props = {
            ...props,
            LASTED_PAYMENT: props.LASTED_PAYMENT ?? new Date(),
        };
    }

    get id(): string {
        return this.props.ID_USER;
    }
    get name(): string {
        return this.props.NAME;
    }
    get lastname(): string {
        return this.props.LASTNAME;
    }
    get email(): string {
        return this.props.EMAIL;
    }
    get password(): string {
        return this.props.PASSWORD;
    }
    get idSituation(): number {
        return this.props.ID_SITUATION;
    }
    get idLicence(): number {
        return this.props.ID_LICENCE;
    }
    get lastedPayment(): Date {
        return this.props.LASTED_PAYMENT;
    }
    get dueDate(): Date {
        if (this.props.DUE_DATE) {
            return this.props.DUE_DATE;
        }

        return this.props.LASTED_PAYMENT;
    }

    updatePayment(paymentDate: Date): void {
        this.props.LASTED_PAYMENT = paymentDate;
    }

    updateDueDate(dueDate: Date): void {
        this.props.DUE_DATE = dueDate;
    }

    updatePassword(hashedPassword: string): void {
        this.props.PASSWORD = hashedPassword;
    }
}
