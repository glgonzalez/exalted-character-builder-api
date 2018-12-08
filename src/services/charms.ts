import { db } from '../config/database';

class CharmsService {
  public async getCharms() {
    try {
      const response = await db.query(`select charms.name, charms.duration, charms.effect, charms.cost, charms.mins, charms.prerequisites,
      charm_types.type from charms inner join charm_types on charms.type_id = charm_types.id`);
      return response.rows;
    } catch(err) {
      throw new Error(err);
    }
  }
}

const charmsService = new CharmsService();
export { charmsService };