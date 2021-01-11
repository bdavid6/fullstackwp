import { Role } from "src/app/enums/role.enum";
import { Result } from "./result";

export interface User {
    id: number,
    username: string,
    name: string,
    e_mail: string,
    role: Role,
    password: string,
    results: Result[]
}
