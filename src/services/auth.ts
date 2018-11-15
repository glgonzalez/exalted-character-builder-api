import * as jwt from 'jsonwebtoken';

interface Details {
  sessionData?: object;
  secret?: string,
  maxAge?: number
}

export class AuthService {

  constructor() {
    process.env.JWT_SECRET = 'exaltedapisecret';
  }

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

}

export default AuthService;