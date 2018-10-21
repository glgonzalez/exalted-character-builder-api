"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
class FlawsRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getFlaws(req, res, next) {
        database_1.db.query(`select flaws.id, flaws.name, flaws.description from flaws`, (err, response) => {
            if (response) {
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    charms: response.rows
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
        this.router.get('/', this.getFlaws);
    }
}
exports.FlawsRouter = FlawsRouter;
const flawRoutes = new FlawsRouter();
flawRoutes.init();
exports.default = flawRoutes.router;
