export interface DueDateProps {
    dueDate: Date;
    calDueDate(): Date;
}

export class FindDueDate {
    constructor(private props: DueDateProps) {}

    static async CalcDueDate(lastedPayment: Date, duration: number) {
        const dueDate = lastedPayment;
        const resultDueDate = new Date(
            dueDate.setDate(dueDate.getDate() + duration),
        );

        if (resultDueDate < lastedPayment) {
            throw new Error('cannot register due date smaller last payment');
        }

        return resultDueDate;
    }
}
