import { Collection, Entity, Enum, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Subject } from "./Subject";

@Entity()
export class User {

    @PrimaryKey()
    id!: number;

    @Property()
    username!: string;

    @Property()
    name!: string;

    @Enum()
    role!: Role;

    @Property()
    sum_credit: number = 0;

    @Property()
    e_mail!: string;

    @Property()
    password!: string;

    @ManyToMany(() => Subject, subject => subject.users)
    subjects = new Collection<Subject>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}

export enum Role {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
}