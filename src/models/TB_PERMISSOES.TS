import { Model, DataTypes } from "sequelize";
import { sequelize } from '../instances/mysql'


interface PERMISSOES extends Model {
    ID_PERMISSAO: number,
    DESC_PERMISSAO: string
}

export const TB_PERMISSOES = sequelize.define<PERMISSOES>('TB_PERMISSOES', {
    ID_PERMISSAO: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    DESC_PERMISSAO: {
        allowNull: false,
        unique: true,
        type: DataTypes.CHAR(45)
    }
},
    {
        tableName: 'TB_PERMISSOES',
        timestamps: false
    }
)