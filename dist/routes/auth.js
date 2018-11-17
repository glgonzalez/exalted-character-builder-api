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
const database_1 = require("../config/database");
const auth_1 = require("../services/auth");
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    verifyJWTToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = (req.method === 'POST') ? req.body.token : req.query.token;
                yield auth_1.default.verifyToken(token);
                res.status(200).send({
                    success: true,
                    data: req.user
                });
            }
            catch (err) {
                res.status(400).send({
                    message: "Validation failed. Given email and password aren't matching."
                });
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query('select * from users where username = $1 or email = $2', [req.body.username, req.body.email]);
                const passwordMatch = yield auth_1.default.verifyPassword(req.body.password, response.rows[0].password);
                if (passwordMatch) {
                    res.status(200).send({
                        message: 'Success',
                        status: res.status,
                        token: yield auth_1.default.createToken({
                            sessionData: response.rows[0],
                            maxAge: 3600
                        })
                    });
                }
                else {
                    res.status(401).send({
                        message: "Validation failed. Given email and password aren't matching.",
                        status: res.status
                    });
                }
            }
            catch (err) {
                res.status(404).send({
                    message: yield err,
                    status: res.status
                });
            }
        });
    }
    init() {
        this.router.post('/login', this.login);
        this.router.post('/authenticate', this.verifyJWTToken);
    }
}
exports.AuthRouter = AuthRouter;
const authRoutes = new AuthRouter();
authRoutes.init();
exports.default = authRoutes.router;
