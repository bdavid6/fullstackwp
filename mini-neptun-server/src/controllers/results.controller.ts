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
        const results = await req.resultRepository!.findAll(['uid', 'sid']);
        res.send(results);
    })
    .post('/', async (req, res) => {
        //error küldéséhez, ha már létezik:
        //const subject_id: number = req.body.subject;
        //const result = await req.resultRepository!.findOne({ subject_id });
        const result = new Result();
        wrap(result).assign(req.body, { em: req.orm.em });
        const result2 = await req.resultRepository!.findOne({uid: result.uid, sid: result.sid});
        if(!result2){
            await req.resultRepository!.persistAndFlush(result);
            res.send(result);
        } else {
            res.sendStatus(409);
        }
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await req.resultRepository!.findOne({ id }, ['sid']);
        if (result){
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })

    .get('/users/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await req.resultRepository!.find({ uid: id, mark: {$gt: 0} }, ['sid']);
        console.log(result);
        if (result){
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })

    .get('/subject/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await req.resultRepository!.find({ sid: id }, ['uid']);
        if (result){
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })

    .put('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const result = await req.resultRepository!.findOne({ id });
        if (result){
            wrap(result).assign(req.body, { em: req.orm.em });
            await req.resultRepository!.persistAndFlush(result);
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })

    .put('/:sid/:uid', async (req, res) => {
        const uid = parseInt(req.params.uid);
        const sid = parseInt(req.params.sid);
        const result = await req.resultRepository!.findOne({ sid: sid, uid: uid });
        if (result){
            wrap(result).assign(req.body, { em: req.orm.em });
            await req.resultRepository!.persistAndFlush(result);
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })

    .delete('/:sid/:uid', async (req, res) => {
        const uid = parseInt(req.params.uid);
        const sid = parseInt(req.params.sid);
        const result = await req.resultRepository!.nativeDelete({ sid: sid, uid: uid });
        if (result){
            res.sendStatus(200);
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