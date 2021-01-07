import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Result } from "../entities/Result";

export const resultsRouter = Router();

resultsRouter
    .use((req, res, next) => {
        req.resultRepository = req.orm.em.getRepository(Result);
        next();
    })
    .get('/', async (req, res) => {
        const results = await req.resultRepository!.findAll();
        res.send(results);
    })
    .post('/', async (req, res) => {
        //error küldéséhez, ha már létezik:
        //const subject_id: number = req.body.subject;
        //const result = await req.resultRepository!.findOne({ subject_id });
        const result = new Result();
        wrap(result).assign(req.body, { em: req.orm.em });
        await req.resultRepository!.persistAndFlush(result);
        res.send(result);
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await req.resultRepository!.findOne({ id }, ['subject']);
        if (result){
            wrap(result).assign(req.body, { em: req.orm.em });
            await req.resultRepository!.persistAndFlush(result);
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })

    .put('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await req.resultRepository!.findOne({ id }, ['subject']);
        if (result){
            wrap(result).assign(req.body, { em: req.orm.em });
            await req.resultRepository!.persistAndFlush(result);
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })
    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await req.resultRepository!.nativeDelete({ id });
        if (result){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })