import { Router, Request, Response, NextFunction } from 'express';
import { intimacyService } from '../services';

export class IntimacyRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getIntimacyTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await intimacyService.getIntimacyTypes();
      res.status(200).send({
        status: res.status,
        intimacy_types: response
      });
    } catch (err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  init() {
    this.router.get('/types', this.getIntimacyTypes);
  }

}

const intimacyRoutes = new IntimacyRouter();
intimacyRoutes.init();

export default intimacyRoutes.router;