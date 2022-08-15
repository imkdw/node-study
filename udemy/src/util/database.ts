import mysql2 from "mysql2";

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  database: "node_complete",
  password: "1234",
});

export const promisePool = pool.promise();
