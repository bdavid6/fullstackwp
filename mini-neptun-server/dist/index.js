"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const controllers_1 = require("./controllers");
const mikroorm_1 = require("./mikroorm");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const passport_1 = require("./auth/passport");
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(passport_1.passport.initialize());
app.use(mikroorm_1.mikroorm(mikro_orm_config_1.default));
app.use(controllers_1.routes);
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}.`);
});
