"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
class UserRouter {
    /**
     * Initialize the userRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes.
     */
    getAll(req, res, next) {
        database_1.db.query('select* from users', (err, response) => {
            if (response) {
                res.json(response.rows);
            }
            else {
                console.log("ERROR: ", err);
            }
        });
    }
    getUserById(req, res, next) {
        database_1.db.query('select* from users where id = ' + req.params.id, (err, response) => {
            if (response) {
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    user: response.rows[0]
                });
            }
            else {
                res.status(404).send({
                    message: err,
                    status: res.status
                });
            }
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getUserById);
    }
}
exports.UserRouter = UserRouter;
// Create the HeroRouter, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();
exports.default = userRoutes.router;
