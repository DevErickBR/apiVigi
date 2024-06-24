import { Table, Column, DataType, HasMany, Model } from 'sequelize-typescript';
import { UserModel } from './userModel';

@Table({
    tableName: 'TB_SITUATIONS',
    timestamps: false,
})
export class SituationModel extends Model<SituationModel> {
    @Column({
        primaryKey: true,
        type: DataType.NUMBER,
        allowNull: false,
        autoIncrement: true,
    })
    ID_SITUATION!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    DESCRIPTION!: string;

    @HasMany(() => UserModel)
    USERS!: UserModel[];
}
