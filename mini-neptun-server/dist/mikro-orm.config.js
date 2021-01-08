"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const Building_1 = require("./entities/Building");
const Result_1 = require("./entities/Result");
const Subject_1 = require("./entities/Subject");
const Users_1 = require("./entities/Users");
exports.default = {
    entities: [Subject_1.Subject, Users_1.Users, Building_1.Building, Result_1.Result],
    dbName: process_1.env.NODE_ENV === 'test' ? 'database.test.sqlite' : 'database.sqlite',
    type: "sqlite",
};
