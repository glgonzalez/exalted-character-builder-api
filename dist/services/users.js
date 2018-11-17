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
const bcrypt = require("bcrypt");
const database_1 = require("../config/database");
class UserService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query('select user_id, username, password, email from users');
                return response.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query('select* from users where user_id = $1', [id]);
                return response.rows[0];
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    addUser(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = 10;
                password = yield bcrypt.hash(password, saltRounds);
                yield database_1.db.query(`insert into users (
            username,
            password,
            email
        ) values($1, $2, $3)`, [username, password, email]);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.UserService = UserService;
const userService = new UserService();
exports.default = userService;
