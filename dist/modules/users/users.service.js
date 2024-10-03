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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("./models");
const upload_1 = require("../upload");
let UserService = class UserService {
    constructor(userModel, uploadService) {
        this.userModel = userModel;
        this.uploadService = uploadService;
    }
    async getAllUsers() {
        return await this.userModel.findAll();
    }
    async createUser(payload) {
        let imageUrl = null;
        if (payload?.image) {
            imageUrl = await this.uploadService.uploadFile({
                destination: 'uploads/users',
                file: payload.image,
            });
        }
        await this.userModel.create({
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            image: imageUrl ? imageUrl?.imageUrl : '',
        });
    }
    async deleteUser(userId) {
        const foundedUser = await this.userModel.findByPk(userId);
        if (foundedUser?.image) {
            await this.uploadService.removeFile({ fileName: foundedUser.image });
        }
        await this.userModel.destroy({ where: { id: userId } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.User)),
    __metadata("design:paramtypes", [Object, upload_1.UploadService])
], UserService);
//# sourceMappingURL=users.service.js.map