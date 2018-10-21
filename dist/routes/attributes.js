"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
class AttributeRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAttributes(req, res, next) {
        database_1.db.query(`select attributes.id, attributes.name, attributes.description, attribute_types.type 
    from attributes inner join attribute_types on attributes.type_id = attribute_types.id`, (err, response) => {
            if (response) {
                // res.json(response.rows);
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    attributes: response.rows
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
    getAttributeTypes(req, res, next) {
        database_1.db.query('select * from attribute_types', (err, response) => {
            if (response) {
                // res.json(response.rows);
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    attributes_types: response.rows
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
        this.router.get('/', this.getAttributes);
        this.router.get('/types', this.getAttributeTypes);
    }
}
exports.AttributeRouter = AttributeRouter;
const attributeRoutes = new AttributeRouter();
attributeRoutes.init();
exports.default = attributeRoutes.router;
