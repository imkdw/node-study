import mysql from "mysql";

const conn = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "passport",
};

export const db = mysql.createConnection(conn);
