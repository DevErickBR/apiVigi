import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { TB_SITUACOES } from './TB_SITUACOES';
import { TB_GRUPOS } from './TB_GRUPOS';
import { TB_LICENCAS } from './TB_LICENCAS';

interface USUARIO extends Model {
    ID_USUARIO: number;
    NOME: string;
    SOBRENOME: string;
    EMAIL: string;
    SENHA: string;
}

export const TB_USUARIOS = sequelize.define<USUARIO>('TB_USUARIOS', {
    ID_USUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    NOME: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    SOBRENOME: {
        type: DataTypes.CHAR(25),
        allowNull: false
    },
    EMAIL: {
        type: DataTypes.CHAR(45),
        allowNull: false,
        unique: true
    },
    ID_GRUPO: {
        type: DataTypes.INTEGER,
        references: {
            model: TB_GRUPOS,
            key: 'ID_GRUPO'
        }
    },
    ID_LICENCA: {
        type: DataTypes.INTEGER,
        references: {
            model: TB_LICENCAS,
            key: 'ID_LICENCA'
        }
    },
    ID_SITUACAO: {
        type: DataTypes.INTEGER,
        references: {
            model: TB_SITUACOES,
            key: 'ID_SITUACAO'
        },
    },
    ULTIMO_PAGAMENTO_LICENCA: {
        type: DataTypes.DATE,
        allowNull: false
    },
    SENHA: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
},
    {
        tableName: 'TB_USUARIOS',
        timestamps: false,
    }
)