import { Knex } from 'knex';
import { string } from 'zod';
import { id } from 'zod/locales';

declare module 'knex/types/tables' {
    export interface tables {
    transaction: {
        id: string
        title: string
        amount: number
        created_at: string
        session_id?: string
    }
}
}