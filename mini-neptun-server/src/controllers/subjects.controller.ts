import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express"
import { Result } from "../entities/Result";
import { Subject } from "../entities/Subject";
import { User } from "../entities/User";

export const subjectsRouter = Router();

subjectsRouter
    .use((req, res, next) => {
        req.subjectRepository = req.orm.em.getRepository(Subject);
        req.entityManager = req.orm.em;
        next();
    })
    .get('/', async (req, res) => {
        const subjects = await req.subjectRepository!.findAll(['results', 'building']);
        res.send(subjects);
    })
    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const subject = await req.subjectRepository!.findOne({ id: id }, ['building']);
        if (subject){
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
        // console.log(id)
        const populatedSubject = req.subjectRepository!.findOne({id: id});
        res.send(subject);
        // res.send("Hello");
    })
    .get('/:id/users', async (req, res) => {
        const id = parseInt(req.params.id);
        // const subject = await req.subjectRepository!.findOne({ id }, ['users']);
        const subject = await req.entityManager!.findOne(Subject, {id: id}, []);
        // console.log(subject?.users)
        if (subject){
            res.send(subject.results);
        } else {
            res.sendStatus(404);
        }
    })
    .get('/:id/results', async (req, res) => {
        const id = parseInt(req.params.id);
        const subject = await req.subjectRepository!.findOne({ id }, ['results']);
        if (subject){
            res.send(subject.results);
        } else {
            res.sendStatus(404);
        }
    })
    .put('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const subject = await req.subjectRepository!.findOne({ id }, []);
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