import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class FlawsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getFlaws(req: Request, res: Response, next: NextFunction): void {
    db.query(`select flaws.id, flaws.name, flaws.description from flaws`, (err, response) => {
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
    this.router.get('/', this.getFlaws);
  }

}

const flawRoutes = new FlawsRouter();
flawRoutes.init();

export default flawRoutes.router;