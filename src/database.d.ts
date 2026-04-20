import pkg from 'knex';
export declare const config: {
    client: string;
    connection: {
        filename: string;
    };
    useNullAsDefault: boolean;
    migrations: {
        extension: string;
        directory: string;
    };
};
export declare const knex: pkg.Knex<any, unknown[]>;
export default config;
//# sourceMappingURL=database.d.ts.map