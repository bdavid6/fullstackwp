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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const Users_1 = require("../entities/Users");
const jwt_1 = require("../auth/jwt");
const password_hash_1 = __importDefault(require("password-hash"));
exports.authRouter = express_1.Router();
exports.authRouter
    .use((req, res, next) => {
    req.userRepository = req.orm.em.getRepository(Users_1.Users);
    next();
})
    .post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    req.body.password = password_hash_1.default.generate(password);
    const user = yield req.userRepository.findOne({ username });
    if (user) {
        res.sendStatus(409);
    }
    else {
        const user = new Users_1.Users();
        core_1.wrap(user).assign(req.body);
        yield req.userRepository.persistAndFlush(user);
        res.send(user);
    }
}))
    .post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield req.userRepository.findOne({ username });
    if (user) {
        if (password_hash_1.default.verify(password, user === null || user === void 0 ? void 0 : user.password)) {
            res.send({ token: jwt_1.generateToken(user) });
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.sendStatus(401);
    }
}));
