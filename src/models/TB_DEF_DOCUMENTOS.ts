import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

interface DEF_DOCUMENTO extends Model {
    ID_DEF_DOCUMENTO: number;
    DEF_DOCUMENTO: string;
}

export const TB_DEF_DOCUMENTOS = sequelize.define<DEF_DOCUMENTO>('TB_DEF_DOCUMENTOS', {
    ID_DEF_DOCUMENTO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    DEF_DOCUMENTO: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        unique: true
    }
},
    {
        tableName: 'TB_DEF_DOCUMENTOS',
        timestamps: false
    }
)