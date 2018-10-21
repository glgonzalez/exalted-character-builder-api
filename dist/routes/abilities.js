"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
class AbilitiesRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAbilities(req, res, next) {
        database_1.db.query('select * from abilities', (err, response) => {
            if (response) {
                // res.json(response.rows);
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    abilities: response.rows
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
        this.router.get('/', this.getAbilities);
    }
}
exports.AbilitiesRouter = AbilitiesRouter;
const abilitiesRoutes = new AbilitiesRouter();
abilitiesRoutes.init();
exports.default = abilitiesRoutes.router;
