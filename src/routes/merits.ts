import { Router, Request, Response, NextFunction } from 'express';
import { meritService } from '../services';

export class MeritRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getMerits(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await meritService.getMerits();
      res.status(200).send({
        status: res.status,
        merits: response
      });
    } catch (err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  init() {
    this.router.get('/', this.getMerits);
  }

}

const meritRoutes = new MeritRouter();
meritRoutes.init();

export default meritRoutes.router;