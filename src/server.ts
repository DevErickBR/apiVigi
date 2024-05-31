import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path'
import MainRouter from './routers/MainRouter'

dotenv.config();

const server = express();

server.use(cors({
    origin: '*'
}));

const moment = require('moment-timezone');
moment.tz.setDefault('America/Sao_Paulo');

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.use(MainRouter)

server.use((req, res) => {
    res.status(404)
    res.json('EndPoint não existe')
})

server.listen(process.env.PORT)