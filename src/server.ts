import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import MainRouter from './routers/MainRouter';
import { sequelize } from './infra/instances/mysql';
import './models';

dotenv.config();

const server = express();

server.use(
    cors({
        origin: '*',
    }),
);

const moment = require('moment-timezone');
moment.tz.setDefault('America/Sao_Paulo');

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.use(MainRouter);

const startServer = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Tables Create and Database connection sucessfull.');

        server.listen(process.env.PORT);
        console.log('server initialize');
    } catch (err) {
        console.error('server is not initialize! check all variants.');
    }
};

startServer();
