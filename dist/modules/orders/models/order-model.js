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
exports.Order = exports.OrderStatus = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const order_item_model_1 = require("./order-item.model");
const users_1 = require("../../users");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["progress"] = 0] = "progress";
    OrderStatus[OrderStatus["completed"] = 1] = "completed";
    OrderStatus[OrderStatus["canceled"] = 2] = "canceled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
let Order = class Order extends sequelize_typescript_1.Model {
};
exports.Order = Order;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Order.prototype, "total_price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, defaultValue: Date.now() }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        defaultValue: OrderStatus.progress,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", Number)
], Order.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_item_model_1.OrderItem),
    __metadata("design:type", Array)
], Order.prototype, "order_items", void 0);
exports.Order = Order = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'orders', timestamps: true })
], Order);
//# sourceMappingURL=order-model.js.map