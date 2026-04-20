import pkg from 'knex';
import { env } from './env/index.js';
const { knex: setupKnex } = pkg;
export const config = {
    client: 'better-sqlite3',
    connection: {
        filename: env.DATABASE_URL || './db/app.db',
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
};
export const knex = setupKnex(config);
export default config;
//# sourceMappingURL=database.js.map