import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { Building } from "./entities/Building";
import { Subject } from "./entities/Subject";
import { Users } from "./entities/Users";

export default {
    entities: [ Subject, Users, Building ],
    dbName: "database.sqlite",
    type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;