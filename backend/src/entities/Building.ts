import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Subject } from "./Subject";

@Entity()
export class Building {

    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    floors!: number;

    @OneToMany(() => Subject, subject => subject.building)
    subjects = new Collection<Subject>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}