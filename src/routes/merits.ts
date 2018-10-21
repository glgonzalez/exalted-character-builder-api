import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class MeritRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getMerits(req: Request, res: Response, next: NextFunction): void {
    db.query(`select merits.name, merits.description, merits.cost, merit_types.type 
    from merits inner join merit_types on merits.merit_type_id = merit_types.id;`, (err, response) => {
      if (response) {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          merits: response.rows
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
    this.router.get('/', this.getMerits);
  }

}

const meritRoutes = new MeritRouter();
meritRoutes.init();

export default meritRoutes.router;