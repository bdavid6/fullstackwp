"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const core_1 = require("@mikro-orm/core");
const Building_1 = require("./Building");
const Users_1 = require("./Users");
let Subject = class Subject {
    constructor() {
        this.users = new core_1.Collection(this);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Subject.prototype, "id", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Number)
], Subject.prototype, "code", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Subject.prototype, "description", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Number)
], Subject.prototype, "credit", void 0);
__decorate([
    core_1.ManyToMany(() => Users_1.Users, user => user.subjects),
    __metadata("design:type", Object)
], Subject.prototype, "users", void 0);
__decorate([
    core_1.ManyToOne(() => Building_1.Building),
    __metadata("design:type", Building_1.Building)
], Subject.prototype, "building", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Object)
], Subject.prototype, "createdAt", void 0);
__decorate([
    core_1.Property({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Subject.prototype, "updatedAt", void 0);
Subject = __decorate([
    core_1.Entity()
], Subject);
exports.Subject = Subject;
