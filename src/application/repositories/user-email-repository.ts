import { User } from '../../domain/entities/user';

export interface UserEmailRepository {
    findByEmail(email: string): Promise<User | null>;
}
