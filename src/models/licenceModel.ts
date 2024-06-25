import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserModel } from './userModel.ts';

@Table({
    tableName: 'TB_LICENCES',
    timestamps: false,
})
export class LicenceModel extends Model<LicenceModel> {
    @Column({
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    ID_LICENCE!: number;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    LICENCE!: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    DURATION_DAYS!: number;

    @HasMany(() => UserModel)
    USERS!: UserModel[];
}
