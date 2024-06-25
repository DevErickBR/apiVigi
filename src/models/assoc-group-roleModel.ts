import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { RoleModel } from './roleModel.ts';
import { GroupModel } from './groupModel.ts';

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
        field: 'ID_GROUP',
    })
    @BelongsTo(() => GroupModel, { foreignKey: 'ID_GROUP', as: 'group' })
    groupAssociation!: GroupModel;

    @ForeignKey(() => RoleModel)
    @Column({
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataType.INTEGER,
        field: 'ID_ROLE',
    })
    @BelongsTo(() => GroupModel, { foreignKey: 'ID_GROUP', as: 'role' })
    roleAssociation!: RoleModel;
}
