import jsonwebtoken from "jsonwebtoken";
import {User} from "../entities/User";

export function generateToken(user: User) {
    const payload = {
        sub: user.id,
        role: user.role,
        name: user.name,
        e_mail: user.e_mail,
    };

    const token = jsonwebtoken.sign(payload, "secret");

    return token;
}