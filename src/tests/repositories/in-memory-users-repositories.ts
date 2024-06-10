import { User } from '../../domain/entities/user';
import { UserEmailRepository } from '../../application/repositories/user-email-repository';

export class InMemoryUsersRepository implements UserEmailRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((user) => user.email == email);

        if (user === undefined) {
            return null;
        }

        return user;
    }
}
