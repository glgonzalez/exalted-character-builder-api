import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../config/database';

export class UserRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    db.query('select* from users', (err, response) => {
        if (response) {
            res.json(response.rows);
        } else {
            console.log("ERROR: ", err);
        }
    });
  }

  public getUserById(req: Request, res: Response, next: NextFunction) {
    db.query('select* from users where user_id = ' + req.params.id, (err, response) => {
        if (response) {
            res.status(200).send({
                message: 'Success',
                status: res.status,
                user: response.rows[0]
            });
        } else {
            res.status(404).send({
            message: err,
            status: res.status
            });
        }
    });
  }

  public async addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const saltRounds: number = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        await db.query(`insert into users (
            username,
            password,
            email
        ) values($1, $2, $3)`, [req.body.username, req.body.password, req.body.email]);
        res.status(200).send({
            message: 'Success',
            status: res.status,
        });
    } catch(err) {
        res.status(404).send({
            message: err,
            status: res.status
        });
        throw new Error(err);
    }
  }

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getUserById);
    this.router.put('/add', this.addUser);
  }

}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;