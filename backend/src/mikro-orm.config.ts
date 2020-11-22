import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { Building } from "./entities/Building";
import { Subject } from "./entities/Subject";
import { User } from "./entities/User";

export default {
    entities: [ Subject, User, Building ],
    dbName: "database.sqlite",
    type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;