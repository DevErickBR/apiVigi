import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import * as models from '../../models/index.ts';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'mssql',
    host: process.env.SQL_HOST as string,
    database: process.env.SQL_DB as string,
    username: process.env.SQL_USER as string,
    password: process.env.SQL_PASSWORD as string,
    port: parseInt(process.env.SQL_PORT as string),
    models: Object.values(models),
});

export default sequelize;
