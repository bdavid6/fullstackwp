import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { env } from "process";
import { Building } from "./entities/Building";
import { Result } from "./entities/Result";
import { Subject } from "./entities/Subject";
import { Users } from "./entities/Users";

export default {
    entities: [ Subject, Users, Building, Result ],
    dbName: env.NODE_ENV === 'test' ? 'database.test.sqlite' : 'database.sqlite',
    type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;