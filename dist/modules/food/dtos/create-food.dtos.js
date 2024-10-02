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
exports.CreateFoodDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateFoodDto {
}
exports.CreateFoodDto = CreateFoodDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'Big Burger',
        required: true,
        description: 'Taom nomi berilishi shart',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'Taom description',
        required: true,
        description: 'Taom izohi berilishi shart',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 30000,
        required: true,
        description: 'Taom narxi berilishi shart',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateFoodDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'binary',
        required: true,
        description: 'Taom rasmi berilishi shart',
    }),
    __metadata("design:type", Object)
], CreateFoodDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 1,
        required: true,
        description: 'Taom category idsi berilishi shart',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateFoodDto.prototype, "categoryId", void 0);
//# sourceMappingURL=create-food.dtos.js.map