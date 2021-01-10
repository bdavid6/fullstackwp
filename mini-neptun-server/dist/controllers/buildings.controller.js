"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingsRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const Building_1 = require("../entities/Building");
exports.buildingsRouter = express_1.Router();
exports.buildingsRouter
    .use((req, res, next) => {
    req.buildingRepository = req.orm.em.getRepository(Building_1.Building);
    next();
})
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buildings = yield req.buildingRepository.findAll();
    res.send(buildings);
})) //NINCS HASZNÁLVA
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const building = yield req.buildingRepository.findOne({ name });
    if (building) {
        res.status(200).send({ id: building.id });
    }
    else {
        const building = new Building_1.Building();
        core_1.wrap(building).assign(req.body);
        //wrap(building).assign(req.body, { em: req.orm.em });
        yield req.buildingRepository.persistAndFlush(building);
        res.status(200).send({ id: building.id });
    }
}));
