import { Collection, Entity, Enum, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Subject } from "./Subject";

@Entity()
export class Users {

    @PrimaryKey()
    id!: number;

    @Property()
    username!: string;

    @Property()
    name!: string;

    @Enum()
    role!: Role;

    @Property()
    sum_credit!: number;

    @Property()
    e_mail!: string;

    @ManyToMany(() => Subject, 'users', { owner: true })
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