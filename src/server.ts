import { sequelize } from './infra/instances/sql-server';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import moment from 'moment-timezone';
import './models';
import MainRouter from './routers/MainRouters'

dotenv.config();

const server = express();

server.use(
    cors({
        origin: '*',
    }),
);

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
