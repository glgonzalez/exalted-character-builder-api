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
const database_1 = require("../config/database");
class AttributeService {
    getAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query(`select attributes.id, attributes.name, attributes.description, attribute_types.type 
      from attributes inner join attribute_types on attributes.type_id = attribute_types.id`);
                return response.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAttributTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query('select * from attribute_types');
                return response.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.AttributeService = AttributeService;
const attributeService = new AttributeService();
exports.attributeService = attributeService;
