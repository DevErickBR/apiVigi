import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AssocRoleUserModel } from './assoc-role-userModel.ts';

@Table({
    tableName: 'TB_ROLES',
    timestamps: false,
})
export class RoleModel extends Model<RoleModel> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    ID_ROLE!: number;

    @Column({
        allowNull: false,
        autoIncrement: false,
        unique: true,
        type: DataType.CHAR,
    })
    DESCRIPTION!: string;

    @HasMany(() => AssocRoleUserModel)
    USER!: AssocRoleUserModel;
}
