import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { RoleModel } from './roleModel.ts';
import { UserModel } from './userModel.ts';

@Table({
    tableName: 'ASSOC_ROLES_USERS',
    timestamps: false,
})
export class AssocRoleUserModel extends Model<AssocRoleUserModel> {
    @ForeignKey(() => RoleModel)
    @Column({
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataType.INTEGER,
        field: 'ID_ROLE',
    })
    @BelongsTo(() => RoleModel, { foreignKey: 'ID_ROLE', as: 'role' })
    roleAssociation!: RoleModel;

    @ForeignKey(() => UserModel)
    @Column({
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataType.CHAR,
        field: 'ID_USER',
    })
    @BelongsTo(() => UserModel, { foreignKey: 'ID_USER', as: 'user' })
    userAssociation!: UserModel;
}
