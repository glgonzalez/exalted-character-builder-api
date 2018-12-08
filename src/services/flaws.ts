import { db } from '../config/database';

class FlawService {
  public async getFlaws() {
    try {
      const response = await db.query(`select flaws.id, flaws.name, flaws.description from flaws`);
      return response.rows;
    } catch(err) {
      throw new Error(err);
    }
  }
}

const flawService = new FlawService();
export { flawService };