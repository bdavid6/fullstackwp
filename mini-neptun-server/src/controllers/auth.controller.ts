import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Users } from "../entities/Users";
import { generateToken } from "../auth/jwt";
import passwordHash from "password-hash";

export const authRouter = Router();

authRouter
    .use((req, res, next) => {
        req.userRepository = req.orm.em.getRepository(Users);
        next();
    })
    .post('/register', async (req, res) => {
        const username: string = req.body.username;
        const password = req.body.password;
        req.body.password = passwordHash.generate(password);
        const user = await req.userRepository!.findOne({ username });
        if (user) {
            res.sendStatus(409);
        } else {
            const user = new Users();
            wrap(user).assign(req.body);
            await req.userRepository!.persistAndFlush(user);
            res.send(user);
        }
    })
    .post('/login', async (req, res) => {
        const username: string = req.body.username;
        const password = req.body.password;
        const user = await req.userRepository!.findOne({ username });
        if (user) {
            if (passwordHash.verify(password, user?.password)) {
                res.send({token: generateToken(user)});
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    })