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
    }) //NINCS HASZNÁLVA

    .post('/', async (req, res) => {
        const name: string = req.body.name;
        const building = await req.buildingRepository!.findOne({ name });
        if (building) {
            res.status(200).send({message: 'ok', id: building.id});
        } else {
            const building = new Building();
            wrap(building).assign(req.body);
            //wrap(building).assign(req.body, { em: req.orm.em });
            await req.buildingRepository!.persistAndFlush(building);
            res.send(building);
        }
    })