import { ASSOC_GRUPO_PERMISSAO } from "./ASSOC_GRUPO_PERMISSAO";
import { ASSOC_USUARIOS_SETORES } from "./ASSOC_USUARIOS_SETORES";
import { TB_GRUPOS } from "./TB_GRUPOS";
import { TB_LICENCAS } from "./TB_LICENCAS";
import { TB_PERMISSOES } from "./TB_PERMISSOES";
import { TB_SETORES } from "./TB_SETORES";
import { TB_SITUACOES } from "./TB_SITUACOES";
import { TB_USUARIOS } from "./TB_USUARIOS";

// relacionamentos TB_USUARIOS

TB_USUARIOS.belongsTo(TB_LICENCAS, { foreignKey: 'ID_LICENCA', as: 'LICENCA' });
TB_USUARIOS.belongsTo(TB_GRUPOS, { foreignKey: 'ID_GRUPO' });
TB_USUARIOS.belongsTo(TB_LICENCAS, { foreignKey: 'ID_LICENCA' });

TB_LICENCAS.hasMany(TB_USUARIOS, { foreignKey: 'ID_LICENCA' });
TB_GRUPOS.hasMany(TB_USUARIOS, { foreignKey: 'ID_GRUPO' });
TB_SITUACOES.hasMany(TB_USUARIOS, { foreignKey: 'ID_SITUACAO' });





// -----------------------------------------------------------

// relacionamentos ASSOC_GRUPO_PERMISSAO 

TB_GRUPOS.belongsToMany(TB_PERMISSOES, { through: ASSOC_GRUPO_PERMISSAO, foreignKey: 'ID_GRUPO' });
TB_PERMISSOES.belongsToMany(TB_GRUPOS, { through: ASSOC_GRUPO_PERMISSAO, foreignKey: 'ID_PERMISSAO' });

// -------------------------------------------------------------------------------

// relacionamentos ASSOC_USUARIOS_SETORES 

TB_USUARIOS.belongsToMany(TB_SETORES, { through: ASSOC_USUARIOS_SETORES, foreignKey: 'ID_USUARIO' });
TB_SETORES.belongsToMany(TB_USUARIOS, { through: ASSOC_GRUPO_PERMISSAO, foreignKey: 'ID_SETOR' });

// ------------------------------------------------------------

export {
    TB_USUARIOS,
    TB_GRUPOS,
    TB_LICENCAS,
    TB_SITUACOES
}