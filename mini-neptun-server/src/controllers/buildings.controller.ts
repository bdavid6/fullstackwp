import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Building } from "../entities/Building";

export const buildingsRouter = Router();

buildingsRouter
    .use((req, res, next) => {
        req.buildingRepository = req.orm.em.getRepository(Building);
        next();
    })
    .get('/', async (req, res) => {
        const buildings = await req.buildingRepository!.findAll();
        res.send(buildings);
    })
    .post('/', async (req, res) => {
        const building = new Building();
        wrap(building).assign(req.body, { em: req.orm.em });
        await req.buildingRepository!.persistAndFlush(building);
        res.send(building);
    })