import { Router } from "express";
import dotenv from 'dotenv';
import * as GRUPOS from '../controllers/ROUTERS_GRUPOS'

dotenv.config()

const router = Router();

router.get('/ping', (req, res) => {
    res.json({
        pong: true
    })
});

router.get("/clientes",);

router.get("/grupos", GRUPOS.ALL_GRUPOS);
router.get('/grupo', GRUPOS.FIND_GRUPO);
router.post('/grupos', GRUPOS.CREATE_GRUPO);
router.delete('/grupo', GRUPOS.DELETE_GRUPO);
router.put('/grupo', GRUPOS.EDIT_GRUPO);

export default router;