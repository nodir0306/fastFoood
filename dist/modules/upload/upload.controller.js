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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const upload_file_dto_1 = require("./dtos/upload-file.dto");
const platform_express_1 = require("@nestjs/platform-express");
const dtos_1 = require("./dtos");
const swagger_1 = require("@nestjs/swagger");
let UploadController = class UploadController {
    constructor(service) {
        this.service = service;
    }
    async uploadFile(payload, file) {
        return await this.service.uploadFile({ ...payload, file });
    }
    async removeFile(payload) {
        return this.service.removeFile(payload);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('/add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_file_dto_1.UploadFileDto, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('/remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.RemoveFileDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "removeFile", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)("Upload"),
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map