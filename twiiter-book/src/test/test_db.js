import mysql from 'mysql';
import { testConfig } from './test_config';

const connection = mysql.createConnection({
  host: testConfig.db.host,
  user: testConfig.db.username,
  password: testConfig.db.password,
  database: testConfig.db.database,
});

export default connection;
