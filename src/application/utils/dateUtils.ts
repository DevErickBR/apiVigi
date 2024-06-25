import { Either, left, right } from '../../domain/errors/either.ts';

export interface DueDateProps {
    dueDate: Date;
    calDueDate(): Date;
}

type Response = Either<Error, Date>;

export class DateUtils {
    static isValidDate(dueDate: Date): boolean {
        if (isNaN(dueDate.getTime())) {
            return false;
        }

        return true;
    }

    static getDueDate(lastedPayment: Date, duration: number): Response {
        const dateStart = new Date(lastedPayment);
        const validLastedPayment = this.isValidDate(dateStart);
        if (validLastedPayment == false) {
            return left(new Error('invalid date,plase, review your params'));
        }
        const resultDueDate = new Date(dateStart.getTime() + duration);
        if (resultDueDate < lastedPayment) {
            return left(
                new Error(
                    'not possible register due date shorter than the lasted payment',
                ),
            );
        }

        return right(resultDueDate);
    }
}
