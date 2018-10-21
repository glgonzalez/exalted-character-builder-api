import * as pg from 'pg';
export const db = new pg.Pool({
    user: 'gilli',
    host: 'localhost',
    database: 'exaltedcb',
    port: 5432
});