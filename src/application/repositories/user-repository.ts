import { User } from '../../domain/entities/user';

export interface UpdateUserProps {
    ID_USER: string;
    NAME?: string;
    LASTNAME?: string;
    EMAIL?: string;
    PASSWORD?: string;
    ID_SITUATION?: number;
    ID_LICENCE?: number;
    LASTED_PAYMENT?: Date;
    DUE_DATE?: Date;
}

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(user: UpdateUserProps): Promise<void>;
    delete(id: string): Promise<void>;
    save(user: User): Promise<void>;
}
