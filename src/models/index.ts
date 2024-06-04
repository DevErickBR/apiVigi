import { sequelize } from "../instances/mysql";
import { ASSOC_GRUPO_PERMISSAO } from "./ASSOC_GRUPO_PERMISSAO";
import { ASSOC_USUARIOS_SETORES } from "./ASSOC_USUARIOS_SETORES";
import { TB_GRUPOS } from "./TB_GRUPOS";
import { TB_LICENCAS } from "./TB_LICENCAS";
import { TB_PERMISSOES } from "./TB_PERMISSOES";
import { TB_SETORES } from "./TB_SETORES";
import { TB_SITUACOES } from "./TB_SITUACOES";
import { TB_USUARIOS } from "./TB_USUARIOS";


// relacionamentos ASSOC_GRUPO_PERMISSAO n:m -------------------------------------------------------

TB_GRUPOS.belongsToMany(TB_PERMISSOES, { through: ASSOC_GRUPO_PERMISSAO, foreignKey: 'ID_GRUPO' });
TB_PERMISSOES.belongsToMany(TB_GRUPOS, { through: ASSOC_GRUPO_PERMISSAO, foreignKey: 'ID_PERMISSAO' });


// relacionamentos TB_USUARIOS 1:n -------------------------------------------------------

TB_GRUPOS.hasMany(TB_USUARIOS, { foreignKey: 'ID_GRUPO' })
TB_USUARIOS.belongsTo(TB_GRUPOS)

TB_LICENCAS.hasMany(TB_USUARIOS, { foreignKey: 'ID_LICENCA' });
TB_USUARIOS.belongsTo(TB_LICENCAS);

// relacionamentos TB_USUARIOS 1:1 -------------------------------------------------------

TB_SITUACOES.hasOne(TB_USUARIOS, { foreignKey: 'ID_SITUACAO' });
TB_USUARIOS.belongsTo(TB_SITUACOES);

// relacionamentos ASSOC_USUARIOS_SETORES -------------------------------------------------------

TB_USUARIOS.belongsToMany(TB_SETORES, { through: ASSOC_USUARIOS_SETORES, foreignKey: 'ID_USUARIO' });
TB_SETORES.belongsToMany(TB_USUARIOS, { through: ASSOC_GRUPO_PERMISSAO, foreignKey: 'ID_SETOR' });


sequelize.sync().then(() => {
    console.log('sucessfull');
}).catch((err) => {
    console.error('error');
});
