import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { db } from '../config/database';

interface Details {
  sessionData?: object;
  secret?: string,
  maxAge?: number
}

export class AuthService {
  public async verifyToken(token: string): Promise<string | object> {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
      throw new Error(err);
    }
  }

  public async createToken(details: Details): Promise<string> {
    try {
      if (typeof details !== 'object') {
        details = {};
      }
      if (!details.maxAge || typeof details.maxAge !== 'number') {
        details.maxAge = 3600
      }

      return await jwt.sign(
        {data: details.sessionData},
        process.env.JWT_SECRET,
        {
          expiresIn: details.maxAge,
          algorithm: 'HS256'
        }
      );
      
    } catch(err) {
      throw new Error(err);
    }
  }

  public async verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch(err) {
      throw new Error(err);
    }
  }

  public async login(param?: string) {
    try {
      const response = await db.query(`select user_id, username, password, email from users where username = $1 or email = $1`, [param]);
      return response;
    } catch(err) {
      throw new Error(err);
    }
  }
}

const authService = new AuthService();
export { authService };