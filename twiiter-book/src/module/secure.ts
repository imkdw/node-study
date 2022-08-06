import bcrypt from 'bcrypt';
import config from '../config/config';

class Secure {
  static hash = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, config.secure.saltCount);
    return hashedPassword;
  };

  static comparePassword = async (plainPassword: string, hashedPassword: string) => {
    if (await bcrypt.compare(plainPassword, hashedPassword)) {
      return true;
    }

    return;
  };
}

export default Secure;
