import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { Building } from "./entities/Building";
import { Subject } from "./entities/Subject";
import { User } from "./entities/User";

declare global {
    namespace Express {
        export interface Request {
            orm: MikroORM;
            subjectRepository?: EntityRepository<Subject>;
            userRepository?: EntityRepository<User>;
            buildingRepository?: EntityRepository<Building>;
        }
    }
}