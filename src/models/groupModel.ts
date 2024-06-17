import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AssocGroupUserModel } from './assoc-group-userModel';

@Table({
    tableName: 'TB_GROUPS',
    timestamps: false,
})
export class GroupModel extends Model<GroupModel> {
    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.NUMBER,
    })
    ID_GROUP!: number;
    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
    })
    DESCRIPTION!: string;

    @HasMany(() => AssocGroupUserModel)
    AssocGroupUser!: AssocGroupUserModel;
}
