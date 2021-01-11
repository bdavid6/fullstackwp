import { Collection, Entity, Enum, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Result } from "./Result";
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

    @OneToMany(() => Result, result => result.uid)
    results = new Collection<Result>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}

export enum Role {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
}