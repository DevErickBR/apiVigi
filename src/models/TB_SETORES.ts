import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

interface SETOR extends Model {
    ID_SETOR: number,
    NOME_SETOR: string
}

export const TB_SETORES = sequelize.define<SETOR>('TB_SETORES', {
    ID_SETOR: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    NOME_SETOR: {
        type: DataTypes.CHAR(45),
        allowNull: false,
        unique: false,
    }
},
    {
        tableName: 'TB_SETORES',
        timestamps: false
    }
);