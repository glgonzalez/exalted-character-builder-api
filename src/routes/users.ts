import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../services';

export class UserRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const response = await userService.getAll();
        res.status(200).send({
            status: res.status,
            users: response
        });
    } catch(err) {
        res.status(404).send({
            message: 'Somehting went wrong',
            error: err,
            status: res.status
        });
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const response = await userService.getUserById(req.params.id);
        res.status(200).send({
            status: res.status,
            user: response
        });
    } catch(err) {
        res.status(404).send({
            message: 'User not found',
            status: res.status
        });
    }
  }

  public async addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await userService.addUser(req.body.username, req.body.password, req.body.email);
        res.status(200).send({
            message: 'Success',
            status: res.status,
        });
    } catch(err) {
        res.status(404).send({
            message: 'Unable to add user',
            status: res.status
        });
    }
  }

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getUserById);
    this.router.put('/add', this.addUser);
  }

}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;