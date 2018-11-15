import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../config/database';

import {AuthService} from '../services';

export class AuthRouter {
  public router: Router;
  private authService: AuthService;

  constructor() {
    this.router = Router();
    this.authService = new AuthService();
    this.init();
  }

  public async verifyJWTToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let token = (req.method === 'POST') ? req.body.token : req.query.token
      const decodedToken: any = await this.authService.verifyToken(token);
      req.user = decodedToken.data
      next();
    } catch(err) {
      res.status(400).send({
        message: "auth.invalid"
      });
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await db.query('select * from users where username = $1 or email = $2', [req.body.username, req.body.email]);
      const passwordMatch = await this.verifyPassword(req.body.password, response.rows[0].password);
      if (passwordMatch) {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          token: this.authService.createToken({
            sessionData: response.rows[0],
            maxAge: 3600
          })
        });
      } else {
        res.status(401).send({
          message: "Validation failed. Given email and password aren't matching.",
          status: res.status
        });
      }
    } catch(err) {
      res.status(404).send({
        message: err,
        status: res.status
    });
    }
  }

  private async verifyPassword(password, passwordHash): Promise<boolean> {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch(err) {
      throw new Error(err);
    }
  }

  init() {
    this.router.post('/authenticate', this.verifyJWTToken);
    this.router.post('/login', this.login);
  }

}

const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;