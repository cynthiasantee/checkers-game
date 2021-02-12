import PG from 'pg';
const Pool = PG.Pool;

export const pool = new Pool({
  user: "postgres",
  password: "checkers",
  host: "localhost",
  port: 5432,
  database: "postgres",
});
