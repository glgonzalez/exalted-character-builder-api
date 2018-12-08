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
const express_1 = require("express");
const services_1 = require("../services");
class MeritRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getMerits(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield services_1.meritService.getMerits();
                res.status(200).send({
                    status: res.status,
                    merits: response
                });
            }
            catch (err) {
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
