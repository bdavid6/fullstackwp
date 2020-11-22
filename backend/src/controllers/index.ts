import { Router } from "express";
import { buildingsRouter } from "./buildings.controller";
import { subjectsRouter } from "./subjects.controller";
import { usersRouter } from "./users.controller";

export const routes = Router();
routes
    .use('/subjects', subjectsRouter)
    .use('/users', usersRouter)
    .use('/buildings', buildingsRouter)