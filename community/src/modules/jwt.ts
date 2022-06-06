import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const createToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
      issuer: "imkdw",
    }
  );
};

export const decodedToken = async (accessToken) => {
  return await jwt.verify(accessToken, SECRET_KEY);
};
