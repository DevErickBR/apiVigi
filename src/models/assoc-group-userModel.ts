import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { UserModel } from './userModel';
import { GroupModel } from './groupModel';

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
        type: DataType.STRING,
    })
    ID_USER!: string;
    @BelongsTo(() => UserModel)
    USER!: UserModel;

    @ForeignKey(() => GroupModel)
    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        type: DataType.NUMBER,
    })
    ID_GROUP!: number;
    @BelongsTo(() => GroupModel)
    GROUP!: GroupModel;
}
