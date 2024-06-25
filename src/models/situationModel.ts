import { Table, Column, DataType, HasMany, Model } from 'sequelize-typescript';
import { UserModel } from './userModel.ts';

@Table({
    tableName: 'TB_SITUATIONS',
    timestamps: false,
})
export class SituationModel extends Model<SituationModel> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
    })
    ID_SITUATION!: number;

    @Column({
        type: DataType.CHAR,
        allowNull: false,
        unique: true,
    })
    SITUATION!: string;

    @HasMany(() => UserModel)
    USERS!: UserModel[];
}
