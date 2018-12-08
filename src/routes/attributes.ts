import { Router, Request, Response, NextFunction } from 'express';
import { attributeService } from '../services';

export class AttributeRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getAttributes(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await attributeService.getAttributes();
      res.status(200).send({
        status: res.status,
        attributes: response
      })
    } catch (err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  public async getAttributeTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await attributeService.getAttributTypes();
      res.status(200).send({
        status: res.status,
        attributes_types: response
      });
    } catch(err) {
      res.status(404).send({
        message: err,
        status: res.status
      });
    }
  }

  init() {
    this.router.get('/', this.getAttributes);
    this.router.get('/types', this.getAttributeTypes);
  }

}

const attributeRoutes = new AttributeRouter();
attributeRoutes.init();

export default attributeRoutes.router;