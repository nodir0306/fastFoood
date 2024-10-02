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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FoodService__uploadService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("./models");
const upload_1 = require("../upload");
const path = require("path");
const fs = require("fs");
let FoodService = class FoodService {
    constructor(foodModel, upload) {
        this.foodModel = foodModel;
        _FoodService__uploadService.set(this, void 0);
        __classPrivateFieldSet(this, _FoodService__uploadService, upload, "f");
    }
    async getAllFoods() {
        return await this.foodModel.findAll();
    }
    async createFood(payload) {
        const fileOptions = await __classPrivateFieldGet(this, _FoodService__uploadService, "f").uploadFile({
            file: payload.image,
            destination: 'uploads/foods',
        });
        await this.foodModel.create({
            name: payload.name,
            description: payload.description,
            price: payload.price,
            image: fileOptions.imageUrl,
            category_id: payload.categoryId,
        });
    }
    async updateFood(id, payload) {
        const food = await this.foodModel.findByPk(id);
        if (!food) {
            throw new common_1.NotFoundException(`Food item with ID ${id} not found`);
        }
        await this.foodModel.update({
            name: payload.name,
            description: payload.description,
            price: payload.price,
            image: payload.image || food.image,
            category_id: payload.categoryId,
        }, { where: { id } });
    }
    async deleteFood(id) {
        const food = await this.foodModel.findByPk(id);
        if (food && food.image) {
            const imagePath = path.join(__dirname, '../../uploads', food.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await this.foodModel.destroy({ where: { id } });
    }
    async createDailyTopFood(id) {
        try {
            const oldDailyFood = await this.foodModel.update({ isDailyTopFood: true }, { where: { isDailyTopFood: false } });
            await this.foodModel.update({ id: id }, { where: { isDailyTopFood: true } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Error: ${error}`);
        }
    }
};
exports.FoodService = FoodService;
_FoodService__uploadService = new WeakMap();
exports.FoodService = FoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.Food)),
    __metadata("design:paramtypes", [Object, upload_1.UploadService])
], FoodService);
//# sourceMappingURL=food.service.js.map