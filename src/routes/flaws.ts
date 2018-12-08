import { Router, Request, Response, NextFunction } from 'express';
import { flawService } from '../services';

export class FlawsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getFlaws(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await flawService.getFlaws();
      res.status(200).send({
        status: res.status,
        flaws: response
      });
    } catch(err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  init() {
    this.router.get('/', this.getFlaws);
  }

}

const flawRoutes = new FlawsRouter();
flawRoutes.init();

export default flawRoutes.router;