export interface DueDateProps {
    dueDate: Date;
    calDueDate(): Date;
}

export class FindDueDate {
    constructor(private props: DueDateProps) {}

    static async CalcDueDate(lastedPayment: Date, duration: number) {
        const dueDate = lastedPayment;

        const result = new Date();

        const resultDueDate = new Date(
            result.setDate(dueDate.getDate() + duration),
        );

        if (resultDueDate < lastedPayment) {
            throw new Error('cannot register due date smaller last payment');
        }

        if (!isNaN(lastedPayment.getTime())) {
            return resultDueDate;
        }

        throw new Error('invalid date,plase, review your params');
    }
}
