import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";


interface GRUPOS extends Model {
    ID_GRUPO: number;
    NOME_GRUPO: string;
}

export const TB_GRUPOS = sequelize.define<GRUPOS>('TB_GRUPOS', {
    ID_GRUPO: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    NOME_GRUPO: {
        allowNull: false,
        unique: true,
        type: DataTypes.CHAR(45)
    }
},
    {
        tableName: 'TB_GRUPOS',
        timestamps: false
    }
)

