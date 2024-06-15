import { compare, hash } from 'bcryptjs';

export class Hash {
    static async execute(password: string): Promise<string> {
        const hash_password = await hash(password, 8);
        return hash_password;
    }

    static async verifyPassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}
