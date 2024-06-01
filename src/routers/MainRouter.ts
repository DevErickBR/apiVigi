import { Router } from "express";
import dotenv from 'dotenv';
import * as GRUPOS from '../controllers/ROUTERS_GRUPOS'

dotenv.config()

const router = Router();

router.get('/ping', (req, res) => {
    res.json({
        pong: true,
        login: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    })
});

router.get("/clientes",);

router.get("/grupos", GRUPOS.ALL_GRUPOS);


export default router;