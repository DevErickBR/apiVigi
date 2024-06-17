import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { RoleModel } from './roleModel';
import { GroupModel } from './groupModel';

@Table({
    tableName: 'ASSOC_GROUPS_ROLES',
    timestamps: false,
})
export class AssocGroupRoleModel extends Model<AssocGroupRoleModel> {
    @ForeignKey(() => GroupModel)
    @Column({
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    @BelongsTo(() => GroupModel)
    Group!: GroupModel;

    @ForeignKey(() => RoleModel)
    @Column({
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    @BelongsTo(() => RoleModel)
    Role!: RoleModel;
}
