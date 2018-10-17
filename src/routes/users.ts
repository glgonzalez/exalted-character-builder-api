import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class UserRouter {
  router: Router


  /**
   * Initialize the userRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Heroes.
   */
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

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getUserById);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;