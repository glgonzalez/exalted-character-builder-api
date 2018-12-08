import { db } from '../config/database';

class EquipmentService {
  public async getWeapons() {
    try {
      const response = await db.query(`select weapons.name, weapons.accuracy, weapons.damage, weapons.defense, weapons.overwhelming, 
      weapons.tag_ids, armor_weapon_types.type from weapons inner join armor_weapon_types 
      on weapons.weapon_type_id = armor_weapon_types.id;`);
      return response.rows;
    } catch(err) {
      throw new Error(err);
    }
  }

  public async getArmor() {
    try {
      const response = await db.query(`select armor.name, armor.soak, armor.hardness, armor.mobility_penalty, 
      armor.tag_ids, armor_weapon_types.type from armor inner join armor_weapon_types 
      on armor.armor_type_id = armor_weapon_types.id;`);
      return response.rows;
    } catch(err) {
      throw new Error(err);
    }
  }

  public async getTags() {
    try {
      const response = await db.query('select * from tags');
      return response.rows;
    } catch(err) {
      throw new Error(err);
    }
  }
}

const equipmentService = new EquipmentService();
export { equipmentService };