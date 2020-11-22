import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Building } from "./Building";
import { User } from "./User";

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

    @ManyToMany(() => User, user => user.subjects)
    users = new Collection<User>(this);

    @ManyToOne(() => Building)
    building!: Building;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}