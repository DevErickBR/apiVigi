import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserModel } from './userModel';

@Table({
    tableName: 'TB_LICENCES',
    timestamps: false,
})
export class LicenceModel extends Model<LicenceModel> {
    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.NUMBER,
    })
    ID_LICENCE!: number;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    NAME_LICENCE!: string;

    @Column({
        allowNull: false,
        type: DataType.NUMBER,
    })
    DURATION_DAYS!: number;

    @HasMany(() => UserModel)
    USERS!: UserModel[];
}
