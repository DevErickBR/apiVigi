import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import * as models from '../../models/index.ts';

dotenv.config({ path: '.env.test' });

export const createTestDataBase = (databaseName: string) => {
    return new Sequelize({
        database: databaseName,
        dialect: 'mssql',
        username: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: parseInt(process.env.PORT as string),
        logging: false,
        models: Object.values(models),
    });
};
