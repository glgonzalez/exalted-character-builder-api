import { Router, Request, Response, NextFunction } from 'express';
import { charmsService } from '../services';

export class CharmsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getCharms(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await charmsService.getCharms();
      res.status(200).send({
        status: res.status,
        charms: response
      });
    } catch(err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  init() {
    this.router.get('/', this.getCharms);
  }

}

const charmRoutes = new CharmsRouter();
charmRoutes.init();

export default charmRoutes.router;