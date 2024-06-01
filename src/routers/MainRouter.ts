import { Router } from "express";
import dotenv from 'dotenv';
import * as GRUPOS from '../controllers/ROUTERS_GRUPOS'
import * as PERMISSOES from '../controllers/ROUTERS_PERMISSOES'
import * as GRUPO_PERMISSAO from '../controllers/ROUTERS_GRUPO_PERMISSAO'

dotenv.config()

const router = Router();

router.get('/ping', (req, res) => {
    res.json({
        pong: true
    })
});

router.get("/clientes",);

router.get("/grupos", GRUPOS.ALL_GRUPOS);
router.get('/grupos/grupo', GRUPOS.FIND_GRUPO);
router.post('/grupos/grupo', GRUPOS.CREATE_GRUPO);
router.delete('/grupos/grupo', GRUPOS.DELETE_GRUPO);
router.put('/grupos/grupo', GRUPOS.EDIT_GRUPO);

router.get('/permissoes', PERMISSOES.ALL_PERMISSOES)
router.get('/permissoes/permissao', PERMISSOES.FIND_PERMISSAO)
router.post('/permissoes/permissao', PERMISSOES.CREATE_PERMISSAO)
router.delete('/permissoes/permissao', PERMISSOES.DELETE_PERMISSAO)
router.put('/permissoes/permissao', PERMISSOES.EDIT_PERMISSAO)

router.get('/grupo-permissoes', GRUPO_PERMISSAO.FIND_GRUPOperPERMISSAO)
router.post('/grupo-permissao', GRUPO_PERMISSAO.addGRUPOforPERMISSAO)
router.delete('/grupo-permissao', GRUPO_PERMISSAO.delPERMISSAOofGRUPO)
router.get('/permissao-grupos', GRUPO_PERMISSAO.FIND_PERMISSOESperGRUPO)


export default router;