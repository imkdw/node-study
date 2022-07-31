import dotenv from 'dotenv';

dotenv.config();

export const testConfig = {
  db: {
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    host: process.env.TEST_DATABASE_HOST,
    port: process.env.TEST_DATABASE_PORT,
    database: process.env.TEST_DATABASE_DBNAME,
  },
};
