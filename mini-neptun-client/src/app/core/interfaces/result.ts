import { Subject } from "./subject";
import { User } from "./user";


export interface Result {
    id: number,
    mark: number,
    sid: Subject,
    uid: User
}
