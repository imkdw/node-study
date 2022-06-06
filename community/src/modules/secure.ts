import bcrypt from "bcrypt";
import { config } from "../config";

export class Secure {
  static getSalt = async () => {
    return await bcrypt.genSalt(config.auth.saltRounds);
  };

  static hash = async (plainPassword: string, salt: string) => {
    return await bcrypt.hashSync(plainPassword, salt);
  };
}
