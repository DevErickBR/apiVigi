import { UpdateUserProps } from './../../application/use-cases/user/update-user/update-user.ts';
import { User } from '../../domain/entities/user.ts';
import { UserRepository } from '../../application/repositories/user-repository.ts';

export class InMemoryUsersRepository implements UserRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((user) => user.email == email);

        if (user) {
            return user;
        }

        return null;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find((user) => user.id === id);

        if (user) {
            return user;
        }

        return null;
    }

    async save(user: User): Promise<void> {
        this.items.push(user);
    }

    async delete(id: string): Promise<void> {
        this.items.filter((props) => props.id !== id);
    }

    async update(
        id: string,
        propsUpdate: UpdateUserProps,
    ): Promise<User | null> {
        const index = this.items.findIndex((props) => props.id === id);

        if (index < 0) {
            return null;
        }

        const user = this.items[index];

        if (propsUpdate.NAME) user.updateName(propsUpdate.NAME);
        if (propsUpdate.LASTNAME) user.updateLastname(propsUpdate.LASTNAME);
        if (propsUpdate.EMAIL) user.updateEmail(propsUpdate.EMAIL);
        if (propsUpdate.PASSWORD) user.updatePassword(propsUpdate.PASSWORD);
        if (propsUpdate.ID_LICENCE) user.updateLicence(propsUpdate.ID_LICENCE);
        if (propsUpdate.LASTED_PAYMENT)
            user.updatePayment(propsUpdate.LASTED_PAYMENT);
        if (propsUpdate.DUE_DATE) user.updateDueDate(propsUpdate.DUE_DATE);
        if (propsUpdate.ID_SITUATION)
            user.updateSituation(propsUpdate.ID_SITUATION);

        //this.items[index] = user;

        return user;
    }
}
