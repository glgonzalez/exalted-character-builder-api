import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../config/database';

import authService from '../services/auth';
import { access } from 'fs';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public async verifyJWTToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let token = req.headers.token;
      await authService.verifyToken(token);
      res.status(200).send({
        success: true,
        data: req.user
      });
    } catch(err) {
      res.status(400).send({
        message: err
      });
      throw err;
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await db.query('select * from users where username = $1 or email = $2', [req.body.username, req.body.email]);
      const passwordMatch: boolean = await authService.verifyPassword(req.body.password, response.rows[0].password);
      if (passwordMatch) {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          token: await authService.createToken({
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
        message: 'Login failed',
        status: res.status
      });
      throw new Error(err);
    }
  }

  init() {
    this.router.post('/login', this.login);
    this.router.post('/authenticate', this.verifyJWTToken);
  }

}

const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;