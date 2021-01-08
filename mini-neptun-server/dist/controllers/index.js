"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const buildings_controller_1 = require("./buildings.controller");
const subjects_controller_1 = require("./subjects.controller");
const users_controller_1 = require("./users.controller");
const auth_controller_1 = require("./auth.controller");
const passport_1 = require("../auth/passport");
const results_controller_1 = require("./results.controller");
exports.routes = express_1.Router();
exports.routes
    .use('/users', users_controller_1.usersRouter)
    .use('/auth', auth_controller_1.authRouter)
    .use('/subjects', passport_1.passport.authenticate("jwt", { session: false }), subjects_controller_1.subjectsRouter)
    .use('/buildings', passport_1.passport.authenticate("jwt", { session: false }), buildings_controller_1.buildingsRouter)
    .use('/results', passport_1.passport.authenticate("jwt", { session: false }), results_controller_1.resultsRouter);
