"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
class CharmsRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getCharms(req, res, next) {
        database_1.db.query(`select charms.name, charms.duration, charms.effect, charms.cost, charms.mins, charms.prerequisites,
    charm_types.type from charms inner join charm_types on charms.type_id = charm_types.id;`, (err, response) => {
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
        this.router.get('/', this.getCharms);
    }
}
exports.CharmsRouter = CharmsRouter;
const charmRoutes = new CharmsRouter();
charmRoutes.init();
exports.default = charmRoutes.router;
