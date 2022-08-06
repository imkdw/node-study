import mysql from 'mysql';
import config from './config/config';

const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database,
});

export default connection;
