import { wrap } from "@mikro-orm/core";
import { Router } from "express"
import { Subject } from "../entities/Subject";

export const subjectsRouter = Router();

subjectsRouter
    .use((req, res, next) => {
        req.subjectRepository = req.orm.em.getRepository(Subject);
        next();
    })
    .get('/', async (req, res) => {
        const subjects = await req.subjectRepository!.findAll(['users', 'building']);
        res.send(subjects);
    })
    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const subject = await req.subjectRepository!.findOne({ id }, ['users', 'building']);
        if (subject){
            wrap(subject).assign(req.body, { em: req.orm.em });
            await req.subjectRepository!.persistAndFlush(subject);
            res.send(subject);
        } else {
            res.sendStatus(404);
        }
    })
    .post('/', async (req, res) => {
        const subject = new Subject();
        wrap(subject).assign(req.body, { em: req.orm.em });
        // console.log(subject.id)
        await req.subjectRepository!.persistAndFlush(subject);
        const id = subject.id;
        console.log(id)
        const populatedSubject = req.subjectRepository!.findOne({id: id});
        res.send(subject);
        // res.send("Hello");
    })
    .get('/:id/users', async (req, res) => {
        const id = parseInt(req.params.id);
        const subject = await req.subjectRepository!.findOne({ id }, ['users']);
        if (subject){
            wrap(subject).assign(req.body, { em: req.orm.em });
            await req.subjectRepository!.persistAndFlush(subject);
            res.send(subject.users);
        } else {
            res.sendStatus(404);
        }
    })
    .put('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const subject = await req.subjectRepository!.findOne({ id }, ['users', 'building']);
        if (subject){
            wrap(subject).assign(req.body, { em: req.orm.em });
            await req.subjectRepository!.persistAndFlush(subject);
            res.send(subject);
        } else {
            res.sendStatus(404);
        }
    })
    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const subject = await req.subjectRepository!.nativeDelete({ id });
        if (subject){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })