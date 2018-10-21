import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class CharmsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getCharms(req: Request, res: Response, next: NextFunction): void {
    db.query(`select charms.name, charms.duration, charms.effect, charms.cost, charms.mins, charms.prerequisites,
    charm_types.type from charms inner join charm_types on charms.type_id = charm_types.id;`, (err, response) => {
      if (response) {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          charms: response.rows
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
    this.router.get('/', this.getCharms);
  }

}

const charmRoutes = new CharmsRouter();
charmRoutes.init();

export default charmRoutes.router;