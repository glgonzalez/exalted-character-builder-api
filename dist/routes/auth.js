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
const services_1 = require("../services");
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.authService = new services_1.AuthService();
        this.init();
    }
    verifyJWTToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = (req.method === 'POST') ? req.body.token : req.query.token;
                const decodedToken = yield this.authService.verifyToken(token);
                req.user = decodedToken.data;
                next();
            }
            catch (err) {
                res.status(400).send({
                    message: "auth.invalid"
                });
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query('select * from users where username = $1 or email = $2', [req.body.username, req.body.email]);
                const passwordMatch = yield this.verifyPassword(req.body.password, response.rows[0].password);
                if (passwordMatch) {
                    res.status(200).send({
                        message: 'Success',
                        status: res.status,
                        token: this.authService.createToken({
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
                    message: err,
                    status: res.status
                });
            }
        });
    }
    verifyPassword(password, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt.compare(password, passwordHash);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    init() {
        this.router.post('/authenticate', this.verifyJWTToken);
        this.router.post('/login', this.login);
    }
}
exports.AuthRouter = AuthRouter;
const authRoutes = new AuthRouter();
authRoutes.init();
exports.default = authRoutes.router;
