import { sequelize } from "../instances/mysql";
import { ASSOC_GRUPO_PERMISSAO } from "./ASSOC_GRUPO_PERMISSAO";
import { TB_GRUPOS } from "./TB_GRUPOS";
import { TB_PERMISSOES } from "./TB_PERMISSOES";


TB_GRUPOS.belongsToMany(TB_PERMISSOES, { through: ASSOC_GRUPO_PERMISSAO, foreignKey: 'ID_GRUPO' });
TB_PERMISSOES.belongsToMany(TB_GRUPOS, { through: ASSOC_GRUPO_PERMISSAO, foreignKey: 'ID_PERMISSAO' });

sequelize.sync().then(() => {
    console.log('sucessfull')
}).catch((err) => {
    console.error('error')
})