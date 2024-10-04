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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("./models");
const food_1 = require("../food");
let OrderService = class OrderService {
    constructor(orderModel, foodModel, orderItemModel) {
        this.orderModel = orderModel;
        this.foodModel = foodModel;
        this.orderItemModel = orderItemModel;
    }
    async getAllOrders() {
        return await this.orderModel.findAll({
            include: models_1.OrderItem,
        });
    }
    async createOrder(payload) {
        const order = await this.orderModel.create({
            total_price: payload.totalPrice,
            user_id: payload.userId,
        });
        for (const orIt of payload.orderItems) {
            const food = await this.foodModel.findByPk(orIt.foodId);
            await this.orderItemModel.create({
                food_id: orIt.foodId,
                order_id: order.id,
                quantity: orIt.quantity,
                total_price: orIt.quantity * food.price,
            });
        }
    }
    async deleteOrder(id) {
        await this.orderModel.destroy({
            where: {
                id,
            },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.Order)),
    __param(1, (0, sequelize_1.InjectModel)(food_1.Food)),
    __param(2, (0, sequelize_1.InjectModel)(models_1.OrderItem)),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrderService);
//# sourceMappingURL=order.service.js.map