import jsonwebtoken from "jsonwebtoken";
import {Users} from "../entities/Users";

export function generateToken(user: Users) {
    const payload = {
        id: user.id,
        role: user.role,
    };

    const token = jsonwebtoken.sign(payload, "secret");

    return token;
}