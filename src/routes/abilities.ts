import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class AbilitiesRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getAbilities(req: Request, res: Response, next: NextFunction) {
    db.query('select * from abilities', (err, response) => {
      if (response) {
          res.status(200).send({
            message: 'Success',
            status: res.status,
            abilities: response.rows
          })
      } else {
        res.status(404).send({
          message: err,
          status: res.status
        });
      }
    });
  }

  init() {
    this.router.get('/', this.getAbilities);
  }

}

const abilitiesRoutes = new AbilitiesRouter();
abilitiesRoutes.init();

export default abilitiesRoutes.router;