import { Router } from "express";
import { buildingsRouter } from "./buildings.controller";
import { subjectsRouter } from "./subjects.controller";
import { usersRouter } from "./users.controller";
import { authRouter } from "./auth.controller";
import { passport } from "../auth/passport";

export const routes = Router();
routes
    .use('/users', usersRouter)
    .use('/auth', authRouter)
    .use('/subjects', passport.authenticate("jwt", { session: false }), subjectsRouter)
    .use('/buildings', passport.authenticate("jwt", { session: false }), buildingsRouter)