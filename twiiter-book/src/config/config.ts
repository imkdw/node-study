import dotenv from "dotenv";
dotenv.config();

export const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: "1h",
    issuer: "imkdw",
  },
  secure: {
    saltCount: 10,
  },
};
