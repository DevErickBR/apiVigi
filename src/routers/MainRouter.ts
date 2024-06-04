import { Router } from "express";
import dotenv from 'dotenv';
import * as GRUPOS from '../controllers/ROUTERS_GRUPOS'
import * as PERMISSOES from '../controllers/ROUTERS_PERMISSOES'
import * as GRUPO_PERMISSAO from '../controllers/ROUTERS_GRUPO_PERMISSAO'
import * as USUARIOS from '../controllers/ROUTERS.USUARIOS'
import * as USUARIOS_SETORES from '../controllers/ROUTERS_USUARIOS_SETORES'

dotenv.config()

const router = Router();

router.get('/ping', (req, res) => {
    res.json({
        pong: true
    })
});

router.get("/clientes",);

// ROTAS relacionadas a TB_GRUPOS

router.get("/grupos", GRUPOS.ALL_GRUPOS);
router.get('/grupos/grupo', GRUPOS.FIND_GRUPO);
router.post('/grupos/grupo', GRUPOS.CREATE_GRUPO);
router.delete('/grupos/grupo', GRUPOS.DELETE_GRUPO);
router.put('/grupos/grupo', GRUPOS.EDIT_GRUPO);

// ROTAS relacionadas a TB_PERMISSOES

router.get('/permissoes', PERMISSOES.ALL_PERMISSOES);
router.get('/permissoes/permissao', PERMISSOES.FIND_PERMISSAO);
router.post('/permissoes/permissao', PERMISSOES.CREATE_PERMISSAO);
router.delete('/permissoes/permissao', PERMISSOES.DELETE_PERMISSAO);
router.put('/permissoes/permissao', PERMISSOES.EDIT_PERMISSAO);

// ROTAS relacionadas a ASSOC_GRUPO_PERMISSAO

router.get('/grupo-permissoes', GRUPO_PERMISSAO.FIND_GRUPOitsPERMISSAOES);
router.get('/permissao-grupos', GRUPO_PERMISSAO.FIND_PERMISSAOoftheGRUPOS);
router.post('/grupo-permissao', GRUPO_PERMISSAO.addGRUPOforPERMISSAO);
router.delete('/grupo-permissao', GRUPO_PERMISSAO.delPERMISSAOofGRUPO);


// ROTAS relacionadas a TB_USUARIOS

router.get('/usuarios', USUARIOS.ALL_USUARIOS);
router.get('/usuarios/usuario', USUARIOS.FIND_USUARIO);
router.post('/usuarios/usuario', USUARIOS.CREATE_USUARIO);
router.put('/usuarios/usuario', USUARIOS.EDIT_DADOS_CLIENTE);
router.put('/usuarios/usuario/situacao', USUARIOS.EDIT_SITUACAO_USUARIO);
router.put('/usuarios/usuario/senha', USUARIOS.ATT_SENHA_USUARIO);
router.put('/usuarios/usuario/pagamento', USUARIOS.ATT_PAGAMENTO_USUARIO);

// ROTAS relacionadas a ASSOC_USUARIOS_SETORES

router.get('/usuario-setores', USUARIOS_SETORES.FIND_USUARIOitsSETORES);
router.get('/setor-usuarios', USUARIOS_SETORES.FIND_SETORitsUSUARIOS);
router.post('/usuario-setor', USUARIOS_SETORES.addUSUARIOforSetor);
router.delete('/usuario-setor', USUARIOS_SETORES.delUSUARIOofSETOR);

export default router;