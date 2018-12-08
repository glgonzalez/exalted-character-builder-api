import { db } from '../config/database';

class MeritService {
  public async getMerits() {
    try {
      const response = await db.query(`select merits.name, merits.description, merits.cost, merit_types.type 
      from merits inner join merit_types on merits.merit_type_id = merit_types.id;`);
      return response.rows;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const meritService = new MeritService();
export { meritService };