import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: '1h',
    issuer: 'imkdw',
  },
  secure: {
    saltCount: 10,
  },
  db: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DBNAME,
  },
};

export default config;
