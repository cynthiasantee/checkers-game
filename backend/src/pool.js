import { config } from "./config/index.js";

import PG from 'pg';
const Pool = PG.Pool;

export const pgClient = new Pool({
    user: config.pgUser,
    host: config.pgHost,
    database: config.pgDatabase,
    password: config.pgPassword,
    port: config.pgPort
  });
  pgClient.on('error', () => console.log('Lost Postgres connection'));