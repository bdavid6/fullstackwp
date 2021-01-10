import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { env } from "process";
import { Building } from "./entities/Building";
import { Result } from "./entities/Result";
import { Subject } from "./entities/Subject";
import { User } from "./entities/User";

export default {
    entities: [ Subject, User, Building, Result ],
    dbName: env.NODE_ENV === 'test' ? 'database.test.sqlite' : 'database.sqlite',
    type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;