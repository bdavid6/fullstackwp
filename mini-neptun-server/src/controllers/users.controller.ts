import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Result } from "../entities/Result";
import { Subject } from "../entities/Subject";
import { User } from "../entities/User";

export const usersRouter = Router();

usersRouter
    .use((req, res, next) => {
        req.userRepository = req.orm.em.getRepository(User);
        req.resultRepository = req.orm.em.getRepository(Result);
        req.entityManager = req.orm.em;
        next();
    })
    .get('/', async (req, res) => {
        const users = await req.userRepository!.findAll(['results']);
        res.send(users);
    })
    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await req.userRepository!.findOne({ id }, []);
        if (user) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    })
    .get('/:id/subjects', async (req, res) => { // Felhasználó által felvett tárgyak lekérése.
        const id = parseInt(req.params.id);
        const subjects = await req.entityManager!.find(Subject, { results: {uid: id} }, {}); 
        if (subjects) {
            res.send(subjects);
        } else {
            res.sendStatus(404);
        }
    })
    .get('/:id/results', async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await req.userRepository!.findOne({ id }, ['results']);
        if (user) {
            res.send(user.results);
        } else {
            res.sendStatus(404);
        }
    })
    // .post('/', async (req, res) => {
    //     const user = new Users();
    //     wrap(user).assign(req.body, { em: req.orm.em });
    //     await req.userRepository!.persistAndFlush(user);
    //     res.send(user);
    // })
    .post('/:id/subjects', async (req, res) => {    // Ezt használjuk tárgyfelvételnél!!!!
        const id = parseInt(req.params.id);
        const user = await req.userRepository!.findOne({ id }, []);
        if (user){
            const subject = req.orm.em.getReference(Subject, req.body.subject);
            if (subject){
                user.subjects.add(subject);
                let result = await req.resultRepository!.findOne({uid: id, sid: subject.id}); // result lekérése
                if(!result){    // Ha nem létezik létrehozzuk
                    result = new Result();
                    wrap(result).assign({uid: id, sid: subject.id, mark: 0}, {em: req.orm.em});
                    await req.resultRepository!.persistAndFlush(result);
                }
            }
            await req.userRepository!.persistAndFlush(user);
            res.send(subject);
        } else {
            res.sendStatus(404);
        }
    })
    .put('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await req.userRepository!.findOne({ id }, []);
        if (user){
            wrap(user).assign(req.body, { em: req.orm.em });
            await req.userRepository!.persistAndFlush(user);
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    })
    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await req.userRepository!.nativeDelete({ id });
        if (user){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })