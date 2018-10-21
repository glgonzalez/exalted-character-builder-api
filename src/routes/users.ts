import { Router, Request, Response, NextFunction } from 'express';
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
      db.query('select* from users where id = ' + req.params.id, (err, response) => {
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

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getUserById);
  }

}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;