import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { RoleModel } from './roleModel';
import { UserModel } from './userModel';

Table({
    tableName: 'ASSOC_ROLES_USERS',
    timestamps: false,
});

export class AssocRoleUserModel extends Model<AssocRoleUserModel> {
    @ForeignKey(() => RoleModel)
    @Column({
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    ID_ROLE!: number;
    @BelongsTo(() => RoleModel)
    ROLE!: RoleModel;

    @ForeignKey(() => UserModel)
    @Column({
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataType.CHAR,
    })
    @BelongsTo(() => UserModel)
    USER!: UserModel;
}
