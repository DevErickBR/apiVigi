import { User } from '../../domain/entities/user.ts';
import { UpdateUserProps } from '../use-cases/user/update-user/update-user.ts';

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(id: string, propsUpdate: UpdateUserProps): Promise<User | null>;
    delete(id: string): Promise<void>;
    save(user: User): Promise<void>;
}
