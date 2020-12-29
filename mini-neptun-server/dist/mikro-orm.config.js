"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Building_1 = require("./entities/Building");
const Subject_1 = require("./entities/Subject");
const Users_1 = require("./entities/Users");
exports.default = {
    entities: [Subject_1.Subject, Users_1.Users, Building_1.Building],
    dbName: "database.sqlite",
    type: "sqlite",
};
