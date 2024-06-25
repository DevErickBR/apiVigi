import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { UserModel } from './userModel.ts';
import { GroupModel } from './groupModel.ts';

@Table({
    tableName: 'ASSOC_USERS_GROUPS',
    timestamps: false,
})
export class AssocGroupUserModel extends Model<AssocGroupUserModel> {
    @ForeignKey(() => UserModel)
    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        type: DataType.CHAR,
        field: 'ID_USER',
    })
    @BelongsTo(() => UserModel, { foreignKey: 'ID_USER', as: 'user' })
    userAssociation!: UserModel;

    @ForeignKey(() => GroupModel)
    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        type: DataType.INTEGER,
        field: 'ID_GROUP',
    })
    @BelongsTo(() => GroupModel, { foreignKey: 'ID_GROUP', as: 'group' })
    groupAssociation!: GroupModel;
}
