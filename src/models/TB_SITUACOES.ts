import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

interface SITUACAO extends Model {
    ID_SITUACAO: number,
    SITUACAO: string
};

export const TB_SITUACOES = sequelize.define<SITUACAO>('TB_SITUACOES', {
    ID_SITUACAO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    SITUACAO: {
        type: DataTypes.CHAR(10),
        unique: true,
        allowNull: false
    }
},
    {
        tableName: 'TB_SITUACOES',
        timestamps: false
    }
)