import jsonwebtoken from "jsonwebtoken";
import {User} from "../entities/User";

export function generateToken(user: User) {
    const payload = {
        sub: user.id,
        role: user.role,
    };

    const token = jsonwebtoken.sign(payload, "secret");

    return token;
}