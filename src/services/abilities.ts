import { db } from '../config/database';

interface Abilities {
  name: string;
  description: string;
}

export class AbilityService {
  public async getAbilities() {
    try {
      const response = await db.query('select name, description from abilities');
      return response;
    } catch(e) {
      throw new Error(e);
    }
  }
}

const abilityService = new AbilityService();
export { abilityService };