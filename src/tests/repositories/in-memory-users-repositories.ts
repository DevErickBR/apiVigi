import { User } from '../../domain/entities/user';
import {
    UpdateUserProps,
    UserRepository,
} from '../../application/repositories/user-repository';

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

    async update(userProps: UpdateUserProps): Promise<void> {
        const index = this.items.findIndex(
            (props) => props.id === userProps.ID_USER,
        );

        if (index < 0) {
            return;
        }

        const user = this.items[index];

        if (userProps.NAME) user.updateName(userProps.NAME);
        if (userProps.LASTNAME) user.updateLastname(userProps.LASTNAME);
        if (userProps.EMAIL) user.updateEmail(userProps.EMAIL);
        if (userProps.PASSWORD) user.updatePassword(userProps.PASSWORD);
        if (userProps.ID_LICENCE) user.updateLicence(userProps.ID_LICENCE);
        if (userProps.LASTED_PAYMENT)
            user.updatePayment(userProps.LASTED_PAYMENT);
        if (userProps.ID_SITUATION)
            user.updateSituation(userProps.ID_SITUATION);

        this.items[index] = user;
    }
}
