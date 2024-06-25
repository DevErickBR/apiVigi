import { randomUUID } from 'crypto';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { LicenceModel } from './licenceModel.ts';
import { SituationModel } from './situationModel.ts';
import { AssocGroupUserModel } from './assoc-group-userModel.ts';
import { AssocRoleUserModel } from './assoc-role-userModel.ts';

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
        type: DataType.CHAR,
        allowNull: false,
    })
    NAME!: string;

    @Column({
        type: DataType.CHAR,
        allowNull: false,
    })
    LASTNAME!: string;

    @Column({
        type: DataType.CHAR,
        allowNull: false,
        unique: true,
    })
    EMAIL!: string;

    @ForeignKey(() => LicenceModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ID_LICENCE!: number;
    @BelongsTo(() => LicenceModel)
    LICENCE!: LicenceModel;

    @ForeignKey(() => SituationModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ID_SITUATION!: number;
    @BelongsTo(() => SituationModel)
    SITUATION!: SituationModel;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    LASTED_PAYMENT!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    DUE_DATE!: Date;

    @Column({
        type: DataType.BLOB,
        allowNull: false,
    })
    PASSWORD!: string;

    @HasMany(() => AssocGroupUserModel)
    assocGroupUser!: AssocGroupUserModel;

    @HasMany(() => AssocRoleUserModel)
    assocRoleUser!: AssocRoleUserModel;
}
