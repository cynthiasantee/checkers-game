export const { Client } = require("pg");

export const client = new Client({
  user: "postgres",
  password: "checkers",
  host: "localhost",
  port: 5432,
  database: "postgres",
});
