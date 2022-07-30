import jwt from "jsonwebtoken";
import { config } from "../config/config";

class Jwt {
  static createToken(email: string) {
    const payload = { email };
    const secretKey = config.jwt.secretKey;
    const options = {
      expiresIn: config.jwt.expiresIn,
      issuer: config.jwt.issuer,
    };

    const accessToken = jwt.sign(payload, secretKey, options);
    return accessToken;
  }

  static verifyToken(accessToken: string) {
    if (jwt.verify(accessToken, config.jwt.secretKey)) {
      return true;
    }

    return;
  }

  static decodeToken(accessToken: string) {
    return jwt.decode(accessToken);
  }
}

export default Jwt;
