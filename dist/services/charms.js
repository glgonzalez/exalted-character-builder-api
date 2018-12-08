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
class CharmsService {
    getCharms() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query(`select charms.name, charms.duration, charms.effect, charms.cost, charms.mins, charms.prerequisites,
      charm_types.type from charms inner join charm_types on charms.type_id = charm_types.id`);
                return response.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
const charmsService = new CharmsService();
exports.charmsService = charmsService;
