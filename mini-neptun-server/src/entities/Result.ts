import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Subject } from "./Subject";
import { User } from "./User";

@Entity()
export class Result {

    @PrimaryKey()
    id!: number;

    @Property()
    mark!: number;

    @ManyToOne(() => Subject)
    sid!: Subject;

    @ManyToOne(() => User)
    uid!: User;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}