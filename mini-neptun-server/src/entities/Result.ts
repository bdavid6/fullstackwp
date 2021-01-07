import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Subject } from "./Subject";

@Entity()
export class Result {

    @PrimaryKey()
    id!: number;

    @Property()
    mark!: number;

    @OneToOne(() => Subject)
    //@JoinColumn()
    subject!: Subject;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}