import { sequelize } from './infra/instances/sql-server.ts';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import moment from 'moment-timezone';
import MainRouter from './routers/mainRouters.ts';

dotenv.config();

const server = express();
const currentDir = new URL('.', import.meta.url).pathname;
const publicDir = path.join(currentDir, '../public');

server.use(
    cors({
        origin: '*',
    }),
);

moment.tz.setDefault('America/Sao_Paulo');

server.use(express.static(publicDir));
server.use(express.urlencoded({ extended: true }));

server.use(MainRouter);

const startServer = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Tables Create and Database connection sucessfull.');
        const htppServer = server.listen(process.env.PORT, () => {
            console.log('server initialize');
        });
        return htppServer;
    } catch (err) {
        console.error('server is not initialize! check all variants.', err);
    }
};

startServer();

export default { server, startServer };
