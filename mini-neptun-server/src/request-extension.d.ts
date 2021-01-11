import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import { Building } from "./entities/Building";
import { Subject } from "./entities/Subject";
import { Result } from "./entities/Result";
import { Users } from "./entities/User";

declare global {
    namespace Express {
        export interface Request {
            orm: MikroORM;
            subjectRepository?: EntityRepository<Subject>;
            userRepository?: EntityRepository<Users>;
            buildingRepository?: EntityRepository<Building>;
            resultRepository?: EntityRepository<Result>;
            entityManager?: EntityManager;
        }
    }
}