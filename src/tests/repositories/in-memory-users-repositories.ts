import { User } from '../../domain/entities/user';
import { UserRepository } from '../../application/repositories/user-repository';

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
}
