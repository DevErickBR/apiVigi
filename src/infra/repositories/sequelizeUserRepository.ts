import { UserRepository } from '../../application/repositories/user-repository';
import { User } from '../../domain/entities/user';
import { UserModel } from '../../models/userModel';
import { UpdateUserProps } from '../../application/use-cases/user/update-user/update-user';

export class SequelizeUserRepository implements UserRepository {
    private toDomain(userModel: UserModel): User {
        return new User(userModel);
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findByPk(id);
        if (!user) return null;
        return this.toDomain(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { EMAIL: email } });
        if (!user) return null;
        return this.toDomain(user);
    }

    async delete(id: string): Promise<void> {
        await UserModel.destroy({ where: { ID_USER: id } });
    }

    async update(
        id: string,
        propsUpdate: UpdateUserProps,
    ): Promise<User | null> {
        const user = await UserModel.findByPk(id);
        if (!user) return null;
        await user.update(propsUpdate);
        return this.toDomain(user);
    }

    async save(user: User): Promise<void> {
        const userModel = UserModel.build({
            ID_USER: user.id,
            NAME: user.name,
            LASTNAME: user.lastname,
            EMAIL: user.email,
            PASSWORD: user.password,
            ID_SITUATION: user.idSituation,
            ID_LICENCE: user.idLicence,
            LASTED_PAYMENT: user.lastedPayment,
            DUE_DATE: user.dueDate,
        } as UserModel);

        await userModel.save();
    }
}
