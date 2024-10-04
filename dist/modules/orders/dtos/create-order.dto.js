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
exports.CreateOrderDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../models");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        type: models_1.OrderItem,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => models_1.OrderItem),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "orderItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 1,
        description: 'User id berilishi shart',
        required: true,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 100000,
        description: 'Total price',
        required: true,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "totalPrice", void 0);
//# sourceMappingURL=create-order.dto.js.map