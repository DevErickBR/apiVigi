import { randomUUID } from 'crypto';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { LicenceModel } from './licenceModel';
import { SituationModel } from './situationModel';

@Table({
    tableName: 'TB_USERS',
    timestamps: false,
})
export class UserModel extends Model<UserModel> {
    @Column({
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        type: DataType.UUIDV4,
        defaultValue: randomUUID(),
    })
    ID_USER!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    NAME!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    LASTANAME!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    EMAIL!: string;

    @ForeignKey(() => LicenceModel)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    ID_LICENCE!: number;
    @BelongsTo(() => LicenceModel)
    LICENCE!: LicenceModel;

    @ForeignKey(() => SituationModel)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    ID_SITUATION!: number;
    @BelongsTo(() => SituationModel)
    SITUATION!: SituationModel;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    LASTED_PAYMENTE!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    DUE_DATE!: Date;
}
