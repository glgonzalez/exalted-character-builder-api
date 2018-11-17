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
const users_1 = require("../services/users");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield users_1.default.getAll();
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    users: response
                });
            }
            catch (err) {
                res.status(404).send({
                    message: 'Somehting went wrong',
                    error: err,
                    status: res.status
                });
            }
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield users_1.default.getUserById(req.params.id);
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    user: response
                });
            }
            catch (err) {
                res.status(404).send({
                    message: 'User not found',
                    status: res.status
                });
            }
        });
    }
    addUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield users_1.default.addUser(req.body.username, req.body.password, req.body.email);
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                });
            }
            catch (err) {
                res.status(404).send({
                    message: 'Unable to add user',
                    status: res.status
                });
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
