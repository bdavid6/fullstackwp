import express from "express";
import bodyParser from "body-parser"
import { routes } from "./controllers"
import { mikroorm } from "./mikroorm";
import mikroOrmConfig from "./mikro-orm.config";

const app = express();

app.use(bodyParser.json());

app.use(mikroorm(mikroOrmConfig));

app.use(routes);

app.listen(3000, () => {
    console.log("Server started at port 3000");
});