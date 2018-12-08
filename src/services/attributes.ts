import { db } from '../config/database';

export class AttributeService {
  public async getAttributes() {
    try {
      const response = await db.query(`select attributes.id, attributes.name, attributes.description, attribute_types.type 
      from attributes inner join attribute_types on attributes.type_id = attribute_types.id`);
      return response.rows;
    } catch(err) {
      throw new Error(err);
    }
  }

  public async getAttributTypes() {
    try {
      const response = await db.query('select * from attribute_types');
      return response.rows;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const attributeService = new AttributeService();
export { attributeService };