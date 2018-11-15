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
const jwt = require("jsonwebtoken");
class AuthService {
    constructor() {
        process.env.JWT_SECRET = 'exaltedapisecret';
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jwt.verify(token, process.env.JWT_SECRET);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    createToken(details) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof details !== 'object') {
                    details = {};
                }
                if (!details.maxAge || typeof details.maxAge !== 'number') {
                    details.maxAge = 3600;
                }
                return yield jwt.sign({ data: details.sessionData }, process.env.JWT_SECRET, {
                    expiresIn: details.maxAge,
                    algorithm: 'HS256'
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
