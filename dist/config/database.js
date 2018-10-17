"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
exports.db = new pg.Pool({
    user: 'gilli',
    host: 'localhost',
    database: 'exaltedcb',
    port: 5432
});
