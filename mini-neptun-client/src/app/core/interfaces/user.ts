import { Role } from "src/app/enums/role.enum";

export interface User {
    username: string,
    name: string,
    e_mail: string,
    role: Role,
    password: string,
}
