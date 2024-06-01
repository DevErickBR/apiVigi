
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { TB_PERMISSOES } from './TB_PERMISSOES';
import { TB_GRUPOS } from './TB_GRUPOS';

interface GRUPO_PERMISSAO extends Model {
    ID_GRUPO: number,
    ID_PERMISSAO: number
}

export const ASSOC_GRUPO_PERMISSAO = sequelize.define<GRUPO_PERMISSAO>('ASSOC_GRUPO_PERMISSAO', {
    ID_GRUPO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: TB_GRUPOS,
            key: 'ID_GRUPO',
        },
        allowNull: false,
    },
    ID_PERMISSAO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: TB_PERMISSOES,
            key: 'ID_PERMISSAO'
        },
        allowNull: false,
    }
},
    {
        tableName: 'ASSOC_GRUPOS_PERMISSOES',
        timestamps: false
    }
);

