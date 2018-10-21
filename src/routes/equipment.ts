import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class EquipmentRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getWeapons(req: Request, res: Response, next: NextFunction): void {
    db.query(`select weapons.name, weapons.accuracy, weapons.damage, weapons.defense, weapons.overwhelming, 
    weapons.tag_ids, armor_weapon_types.type from weapons inner join armor_weapon_types 
    on weapons.weapon_type_id = armor_weapon_types.id;`, (err, response) => {
      if (response) {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          weapons: response.rows
        });
      } else {
        res.status(404).send({
          message: err,
          status: res.status
        });
      }
    });
  }

  public getArmor(req: Request, res: Response, next: NextFunction) : void {
    db.query(`select armor.name, armor.soak, armor.hardness, armor.mobility_penalty, 
    armor.tag_ids, armor_weapon_types.type from armor inner join armor_weapon_types 
    on armor.armor_type_id = armor_weapon_types.id;`, (err, response) => {
      if (response) {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          armor: response.rows
        });
      } else {
        res.status(404).send({
          message: err,
          status: res.status
        });
      }
    });
  }

  public getTags(req?: Request, res?: Response, next?: NextFunction): void {
    db.query('select* from tags', (err, response) => {
      if (response) {
        res.status(200).send({
          message: 'SUCCESS',
          status: res.status,
          tags: response.rows
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
    this.router.get('/weapons', this.getWeapons);
    this.router.get('/armor', this.getArmor);
    this.router.get('/tags', this.getTags);
  }

}

const equipmentRoutes = new EquipmentRouter();
equipmentRoutes.init();

export default equipmentRoutes.router;