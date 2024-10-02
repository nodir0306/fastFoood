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
var _UserController__service;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const _config_1 = require("../../config");
const users_service_1 = require("./users.service");
const dto_1 = require("./dto");
let UserController = class UserController {
    constructor(service) {
        _UserController__service.set(this, void 0);
        __classPrivateFieldSet(this, _UserController__service, service, "f");
    }
    async getAllUsers() {
        return await __classPrivateFieldGet(this, _UserController__service, "f").getAllUsers();
    }
    async createUser(createUserPayload, image) {
        await __classPrivateFieldGet(this, _UserController__service, "f").createUser({
            ...createUserPayload,
            image: image,
        });
    }
    async updateUser(id, updateUserPayload, image) {
        await __classPrivateFieldGet(this, _UserController__service, "f").updateUser(id, { ...updateUserPayload, image: image?.originalname });
    }
    async deleteUser(id) {
        await __classPrivateFieldGet(this, _UserController__service, "f").deleteUser(id);
    }
};
exports.UserController = UserController;
_UserController__service = new WeakMap();
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Post)('/add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', _config_1.multerConfig)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', _config_1.multerConfig)),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map