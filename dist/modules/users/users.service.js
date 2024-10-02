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
var _UserService__uploadService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const upload_1 = require("../upload");
const path = require("path");
const fs = require("fs");
const models_1 = require("./models");
let UserService = class UserService {
    constructor(userModel, upload) {
        this.userModel = userModel;
        _UserService__uploadService.set(this, void 0);
        __classPrivateFieldSet(this, _UserService__uploadService, upload, "f");
    }
    async getAllUsers() {
        return await this.userModel.findAll();
    }
    async createUser(payload, image) {
        let imageUrl = 'user-image.jpg';
        if (image) {
            const fileOptions = await __classPrivateFieldGet(this, _UserService__uploadService, "f").uploadFile({
                file: image,
                destination: 'uploads/users',
            });
            imageUrl = fileOptions.imageUrl;
        }
        await this.userModel.create({
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            image: imageUrl,
        });
    }
    async updateUser(id, payload) {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        let updatedImage = user.image;
        if (payload.image) {
            const fileOptions = await __classPrivateFieldGet(this, _UserService__uploadService, "f").uploadFile({
                file: payload.image,
                destination: 'uploads/users',
            });
            updatedImage = fileOptions.imageUrl;
            const oldImagePath = path.join(__dirname, '../../uploads', user.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        await this.userModel.update({
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            image: updatedImage,
        }, { where: { id } });
    }
    async deleteUser(id) {
        const user = await this.userModel.findByPk(id);
        if (user && user.image) {
            const imagePath = path.join(__dirname, '../../uploads', user.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await this.userModel.destroy({ where: { id } });
    }
};
exports.UserService = UserService;
_UserService__uploadService = new WeakMap();
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.Users)),
    __metadata("design:paramtypes", [Object, upload_1.UploadService])
], UserService);
//# sourceMappingURL=users.service.js.map