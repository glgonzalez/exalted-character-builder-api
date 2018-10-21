"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
class MeritRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getMerits(req, res, next) {
        database_1.db.query(`select merits.name, merits.description, merits.cost, merit_types.type 
    from merits inner join merit_types on merits.merit_type_id = merit_types.id;`, (err, response) => {
            if (response) {
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    merits: response.rows
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
        this.router.get('/', this.getMerits);
    }
}
exports.MeritRouter = MeritRouter;
const meritRoutes = new MeritRouter();
meritRoutes.init();
exports.default = meritRoutes.router;
