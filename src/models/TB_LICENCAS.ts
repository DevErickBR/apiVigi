import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

interface LICENCA extends Model {
    ID_LICENCA: number,
    NOME_LICENCA: string,
    DURACAO_DIAS: number,
};

export const TB_LICENCAS = sequelize.define<LICENCA>('TB_LICENCAS', {
    ID_LICENCA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    NOME_LICENCA: {
        type: DataTypes.CHAR(45),
        unique: true,
        allowNull: false,
    },
    DURACAO_DIAS: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
    {
        tableName: 'TB_LICENCAS',
        timestamps: false
    }
);