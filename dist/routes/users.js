"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt = require("bcrypt");
const database_1 = require("../config/database");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
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
        database_1.db.query('select* from users where user_id = ' + req.params.id, (err, response) => {
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
    addUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = 10;
                req.body.password = yield bcrypt.hash(req.body.password, saltRounds);
                yield database_1.db.query(`insert into users (
            username,
            password,
            email
        ) values($1, $2, $3)`, [req.body.username, req.body.password, req.body.email]);
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                });
            }
            catch (err) {
                res.status(404).send({
                    message: err,
                    status: res.status
                });
                throw new Error(err);
            }
        });
    }
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getUserById);
        this.router.put('/add', this.addUser);
    }
}
exports.UserRouter = UserRouter;
const userRoutes = new UserRouter();
userRoutes.init();
exports.default = userRoutes.router;
