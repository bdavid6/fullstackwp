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
exports.Role = exports.Users = void 0;
const core_1 = require("@mikro-orm/core");
const Subject_1 = require("./Subject");
let Users = class Users {
    constructor() {
        this.sum_credit = 0;
        this.subjects = new core_1.Collection(this);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    core_1.Enum(),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Number)
], Users.prototype, "sum_credit", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Users.prototype, "e_mail", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    core_1.ManyToMany(() => Subject_1.Subject, 'users', { owner: true }),
    __metadata("design:type", Object)
], Users.prototype, "subjects", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Object)
], Users.prototype, "createdAt", void 0);
__decorate([
    core_1.Property({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Users.prototype, "updatedAt", void 0);
Users = __decorate([
    core_1.Entity()
], Users);
exports.Users = Users;
var Role;
(function (Role) {
    Role["STUDENT"] = "STUDENT";
    Role["ADMIN"] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
