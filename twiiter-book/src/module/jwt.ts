import jwt from "jsonwebtoken";
import { config } from "../config/config";

class Jwt {
  static createToken(userId: string) {
    const payload = { userId };
    const secretKey = config.jwt.secretKey;
    const options = {
      expiresIn: config.jwt.expiresIn,
      issuer: config.jwt.issuer,
    };

    const accessToken = jwt.sign(payload, secretKey, options);
    return accessToken;
  }
}

export default Jwt;
