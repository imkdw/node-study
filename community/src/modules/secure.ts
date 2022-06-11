import bcrypt from "bcrypt";
import { config } from "../config";

export class Secure {
  static getSalt = async (): Promise<string> => {
    return await bcrypt.genSalt(config.auth.saltRounds);
  };

  static hash = async (
    plainPassword: string,
    salt: string
  ): Promise<string> => {
    return await bcrypt.hashSync(plainPassword, salt);
  };

  static comparePassword = async (plainPassword, hashedPassword: string) => {
    return await bcrypt.compare;
  };
}
