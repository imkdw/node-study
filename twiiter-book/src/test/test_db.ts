import mysql from 'mysql';

export const testConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  port: 3306,
  database: 'tesT_twitter_book',
});
