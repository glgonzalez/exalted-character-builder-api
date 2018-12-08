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
class EquipmentService {
    getWeapons() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query(`select weapons.name, weapons.accuracy, weapons.damage, weapons.defense, weapons.overwhelming, 
      weapons.tag_ids, armor_weapon_types.type from weapons inner join armor_weapon_types 
      on weapons.weapon_type_id = armor_weapon_types.id;`);
                return response.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getArmor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query(`select armor.name, armor.soak, armor.hardness, armor.mobility_penalty, 
      armor.tag_ids, armor_weapon_types.type from armor inner join armor_weapon_types 
      on armor.armor_type_id = armor_weapon_types.id;`);
                return response.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query('select * from tags');
                return response.rows;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
const equipmentService = new EquipmentService();
exports.equipmentService = equipmentService;
