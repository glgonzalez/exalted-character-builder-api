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
class AbilityService {
    getAbilities() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query('select name, description from abilities');
                return response;
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
exports.AbilityService = AbilityService;
const abilityService = new AbilityService();
exports.abilityService = abilityService;
