import { Building } from "./building";

export interface Subject {
    id: number,
    name: string,
    code: number,
    description: string,
    credit: number,
    building: any
}
