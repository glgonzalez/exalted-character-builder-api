"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
class AuthService {
    constructor() {
        this.express = express();
    }
    sessionChecker(req, res, next) {
        if (req.session.user && req.cookies.user_sid) {
            res.status(200).send({
                message: 'Success',
                status: res.status,
                session: req.session
            });
        }
        else {
            res.status(404).send({
                message: 'auth.required',
                status: res.status
            });
        }
    }
    ;
    setSession() {
        this.express.use(session({
            secret: 'exaltedapisecret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: true,
                secure: 'auto'
            }
        })); // session secret
    }
    clearCookies() {
        this.express.use((req, res, next) => {
            if (req.cookies.user_sid && !req.session.user) {
                res.clearCookie('user_sid');
            }
            next();
        });
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
