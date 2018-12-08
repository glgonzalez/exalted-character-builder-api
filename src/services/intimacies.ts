import { db } from '../config/database';

class IntimacyService {
  public async getIntimacyTypes() {
    try {
      const response = await db.query(`select intimacy_types.id, intimacy_types.type from intimacy_types`);
      return response.rows;
    } catch(err) {
      throw new Error(err);
    }
  }
}

const intimacyService = new IntimacyService();
export { intimacyService };