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
exports.usersRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const Subject_1 = require("../entities/Subject");
const Users_1 = require("../entities/Users");
exports.usersRouter = express_1.Router();
exports.usersRouter
    .use((req, res, next) => {
    req.userRepository = req.orm.em.getRepository(Users_1.Users);
    next();
})
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield req.userRepository.findAll(['subjects']);
    res.send(users);
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield req.userRepository.findOne({ id }, ['subjects']);
    if (user) {
        res.send(user);
    }
    else {
        res.sendStatus(404);
    }
}))
    .get('/:id/subjects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield req.userRepository.findOne({ id }, ['subjects']);
    if (user) {
        res.send(user.subjects);
    }
    else {
        res.sendStatus(404);
    }
}))
    // .post('/', async (req, res) => {
    //     const user = new Users();
    //     wrap(user).assign(req.body, { em: req.orm.em });
    //     await req.userRepository!.persistAndFlush(user);
    //     res.send(user);
    // })
    .post('/:id/subjects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield req.userRepository.findOne({ id }, ['subjects']);
    if (user) {
        const subject = req.orm.em.getReference(Subject_1.Subject, req.body.subject);
        if (subject) {
            user.subjects.add(subject);
        }
        yield req.userRepository.persistAndFlush(user);
        res.send(subject);
    }
    else {
        res.sendStatus(404);
    }
}))
    .put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield req.userRepository.findOne({ id }, ['subjects']);
    if (user) {
        core_1.wrap(user).assign(req.body, { em: req.orm.em });
        yield req.userRepository.persistAndFlush(user);
        res.send(user);
    }
    else {
        res.sendStatus(404);
    }
}))
    .delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield req.userRepository.nativeDelete({ id });
    if (user) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
}));
