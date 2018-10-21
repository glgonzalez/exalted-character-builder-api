"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
class IntimacyRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getIntimacyTypes(req, res, next) {
        database_1.db.query(`select intimacy_types.id, intimacy_types.type from intimacy_types`, (err, response) => {
            if (response) {
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    types: response.rows
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
    init() {
        this.router.get('/types', this.getIntimacyTypes);
    }
}
exports.IntimacyRouter = IntimacyRouter;
const intimacyRoutes = new IntimacyRouter();
intimacyRoutes.init();
exports.default = intimacyRoutes.router;
