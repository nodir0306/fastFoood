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
exports.OrderItem = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const order_model_1 = require("./order-model");
const users_1 = require("../../users");
let OrderItem = class OrderItem extends sequelize_typescript_1.Model {
};
exports.OrderItem = OrderItem;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], OrderItem.prototype, "total_price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 1 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => order_model_1.Order),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "order_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "user_id", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'order-items', timestamps: true })
], OrderItem);
//# sourceMappingURL=order-item.model.js.map