import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export class Jwt {
  static create(userId: string) {
    try {
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
    } catch (error: any) {
      console.error(error);
    }
  }

  static decoded(accessToken: string) {
    try {
      return jwt.verify(accessToken, SECRET_KEY);
    } catch (error: any) {
      console.error(error);
    }
  }
}
