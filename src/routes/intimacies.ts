import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class IntimacyRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getIntimacyTypes(req: Request, res: Response, next: NextFunction): void {
    db.query(`select intimacy_types.id, intimacy_types.type from intimacy_types`, (err, response) => {
      if (response) {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          types: response.rows
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
    this.router.get('/types', this.getIntimacyTypes);
  }

}

const intimacyRoutes = new IntimacyRouter();
intimacyRoutes.init();

export default intimacyRoutes.router;