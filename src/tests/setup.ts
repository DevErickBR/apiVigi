import { createTestDataBase } from './dataBase/testDataBase.ts';
import { Sequelize } from 'sequelize-typescript';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import { beforeAll, afterAll } from 'vitest';
import dotenv from 'dotenv';
import * as IServer from '../server.ts';

let sequelize: Sequelize;
let databaseName: string;
let httpServer: ReturnType<typeof startServer>;

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
    databaseName = `test_db_${randomUUID()}`;
    execSync(
        `sqlcmd -S ${process.env.DB_HOST} -U ${process.env.DB_USER} -Q "CREATE DATABASE ${databaseName}"`,
    );
    sequelize = createTestDataBase(databaseName);

    await sequelize.sync({ force: true });

    httpServer = await IServer.default.startServer();
});

afterAll(async () => {
    await sequelize.close();
    execSync(
        `sqlcmd -S ${process.env.DB_HOST} -U ${process.env.DB_USER} -Q "DROP DATABASE ${databaseName}"`,
    );
});

export { sequelize };
