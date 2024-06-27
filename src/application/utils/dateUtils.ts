import { Either, left, right } from '../../domain/errors/either.ts';

export interface DueDateProps {
    dueDate: Date;
    calDueDate(): Date;
}

type Response = Either<Error, Date>;

export class DateUtils {
    static isValidDate(dueDate: Date): boolean {
        if (dueDate.toString() == 'Invalid Date') {
            return false;
        } else {
            return true;
        }
    }

    static getDueDate(lastedPayment: Date, duration: number): Response {
        const validLastedPayment = this.isValidDate(lastedPayment);
        if (!validLastedPayment) {
            return left(new Error('invalid date,plase, review your params'));
        }
        const resultDueDate = new Date(lastedPayment);
        resultDueDate.setDate(lastedPayment.getDate() + duration);
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
