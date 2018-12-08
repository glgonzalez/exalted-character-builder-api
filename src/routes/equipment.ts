import { Router, Request, Response, NextFunction } from 'express';
import { equipmentService } from '../services';

export class EquipmentRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getWeapons(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await equipmentService.getWeapons();
      res.status(200).send({
        status: res.status,
        weapons: response
      });
    } catch(err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  public async getArmor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await equipmentService.getArmor();
      res.status(200).send({
        status: res.status,
        armor: response
      });
    } catch(err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  public async getTags(req?: Request, res?: Response, next?: NextFunction): Promise<void> {
    try {
      const response = await equipmentService.getTags();
      res.status(200).send({
        status: res.status,
        tags: response
      });
    } catch (err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  init() {
    this.router.get('/weapons', this.getWeapons);
    this.router.get('/armor', this.getArmor);
    this.router.get('/tags', this.getTags);
  }

}

const equipmentRoutes = new EquipmentRouter();
equipmentRoutes.init();

export default equipmentRoutes.router;