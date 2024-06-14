import { Either, left, right } from '../../domain/errors/either';

export interface DueDateProps {
    dueDate: Date;
    calDueDate(): Date;
}

type Response = Either<Error, Date>;

export class FindDueDate {
    constructor(private props: DueDateProps) {}

    static CalcDueDate(lastedPayment: Date, duration: number): Response {
        const dueDate = lastedPayment;

        const result = new Date();

        const resultDueDate = new Date(
            result.setDate(dueDate.getDate() + duration),
        );

        if (resultDueDate < lastedPayment) {
            return left(
                new Error('cannot register due date smaller last payment'),
            );
        }

        if (!isNaN(lastedPayment.getTime())) {
            return right(resultDueDate);
        }

        return left(new Error('invalid date,plase, review your params'));
    }
}
