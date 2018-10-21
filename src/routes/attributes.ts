import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class AttributeRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getAttributes(req: Request, res: Response, next: NextFunction) {
    db.query(`select attributes.id, attributes.name, attributes.description, attribute_types.type 
    from attributes inner join attribute_types on attributes.type_id = attribute_types.id`, (err, response) => {
      if (response) {
          // res.json(response.rows);
          res.status(200).send({
            message: 'Success',
            status: res.status,
            attributes: response.rows
          })
      } else {
        res.status(404).send({
          message: err,
          status: res.status
        });
      }
    });
  }

  public getAttributeTypes(req: Request, res: Response, next: NextFunction) {
    db.query('select * from attribute_types', (err, response) => {
      if (response) {
        // res.json(response.rows);
        res.status(200).send({
          message: 'Success',
          status: res.status,
          attributes_types: response.rows
        })
      } else {
        res.status(404).send({
          message: err,
          status: res.status
        });
      }
    });
  }

  init() {
    this.router.get('/', this.getAttributes);
    this.router.get('/types', this.getAttributeTypes);
  }

}

const attributeRoutes = new AttributeRouter();
attributeRoutes.init();

export default attributeRoutes.router;