import { Router, Request, Response, NextFunction } from 'express';
import { abilityService } from '../services';

export class AbilitiesRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getAbilities(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await abilityService.getAbilities();
      res.status(200).send({
        status: res.status,
        abilities: response.rows
      });
    } catch(err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  init() {
    this.router.get('/', this.getAbilities);
  }

}

const abilitiesRoutes = new AbilitiesRouter();
abilitiesRoutes.init();

export default abilitiesRoutes.router;