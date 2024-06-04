import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { TB_USUARIOS } from './TB_USUARIOS';
import { TB_SETORES } from './TB_SETORES';

interface USUARIO_SETOR extends Model {
    ID_USUARIO: number,
    ID_SETOR: number,
}

export const ASSOC_USUARIOS_SETORES = sequelize.define<USUARIO_SETOR>('ASSOC_USUARIOS_SETORES', {
    ID_USUARIO: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: TB_USUARIOS,
            key: 'ID_USUARIO'
        }
    },
    ID_SETOR: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: TB_SETORES,
            key: 'ID_SETOR'
        }
    }
},
    {
        tableName: 'ASSOC_USUARIOS_SETORES',
        timestamps: false
    })