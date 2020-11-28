import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Building } from "./Building";
import { Users } from "./Users";

@Entity()
export class Subject {

    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    code!: number;

    @Property()
    description!: string;

    @Property()
    credit!: number;

    @ManyToMany(() => Users, user => user.subjects)
    users = new Collection<Users>(this);

    @ManyToOne(() => Building)
    building!: Building;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}