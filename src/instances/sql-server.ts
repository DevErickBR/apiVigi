import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mssql',
    host: process.env.SQL_HOST as string,
    database: process.env.SQL_DB as string,
    username: process.env.SQL_USER as string,
    password: process.env.SQL_PASSWORD as string,
    port: parseInt(process.env.SQL_PORT as string),
    models: [__dirname + '/models'],
});

export default sequelize;
