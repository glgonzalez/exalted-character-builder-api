import * as bcrypt from 'bcrypt';
import { db } from '../config/database';

interface User {
  id: number,
  username: string,
  password: string,
  email: string
}

export class UserService {
  public async getAll(): Promise<User[]> {
    try {
        const response = await db.query('select user_id, username, password, email from users');
        return response.rows;
    } catch(err) {
        throw new Error(err);
    }
  }

  public async getUserById(id: number): Promise<User> {
    try {
        const response = await db.query('select* from users where user_id = $1', [id]);
        return response.rows[0];
    } catch(err) {
        throw new Error(err);
    }
  }

  public async addUser(username: string, password: string, email: string): Promise<void> {
    try {
        const saltRounds: number = 10;
        password = await bcrypt.hash(password, saltRounds);
        await db.query(`insert into users (
            username,
            password,
            email
        ) values($1, $2, $3)`, [username, password, email]);
    } catch(err) {
        throw new Error(err);
    }
  }
}

const userService = new UserService();

export { userService };