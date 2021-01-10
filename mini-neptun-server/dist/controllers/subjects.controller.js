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
exports.subjectsRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const Subject_1 = require("../entities/Subject");
exports.subjectsRouter = express_1.Router();
exports.subjectsRouter
    .use((req, res, next) => {
    req.subjectRepository = req.orm.em.getRepository(Subject_1.Subject);
    next();
})
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = yield req.subjectRepository.findAll(['users', 'building']);
    res.send(subjects);
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const subject = yield req.subjectRepository.findOne({ id }, ['users', 'building']);
    if (subject) {
        core_1.wrap(subject).assign(req.body, { em: req.orm.em });
        yield req.subjectRepository.persistAndFlush(subject);
        res.send(subject);
    }
    else {
        res.sendStatus(404);
    }
}))
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = new Subject_1.Subject();
    core_1.wrap(subject).assign(req.body, { em: req.orm.em });
    yield req.subjectRepository.persistAndFlush(subject);
    res.send(subject);
}))
    .get('/:id/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const subject = yield req.subjectRepository.findOne({ id }, ['users']);
    if (subject) {
        core_1.wrap(subject).assign(req.body, { em: req.orm.em });
        yield req.subjectRepository.persistAndFlush(subject);
        res.send(subject.users);
    }
    else {
        res.sendStatus(404);
    }
}))
    .put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const subject = yield req.subjectRepository.findOne({ id }, ['users', 'building']);
    if (subject) {
        core_1.wrap(subject).assign(req.body, { em: req.orm.em });
        yield req.subjectRepository.persistAndFlush(subject);
        res.send(subject);
    }
    else {
        res.sendStatus(404);
    }
}))
    .delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const subject = yield req.subjectRepository.nativeDelete({ id });
    if (subject) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
}));
