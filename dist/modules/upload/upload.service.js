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
exports.UploadService = void 0;
const fs = require("fs/promises");
const path = require("path");
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
let UploadService = class UploadService {
    constructor() { }
    async uploadFile(payload) {
        const extName = path.extname(payload.file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;
        const fullFilePath = path.join(__dirname, '../../../', payload.destination, fileName);
        const isFileFolderExists = (0, fs_1.existsSync)(path.join(__dirname, '../../../', payload.destination));
        if (!isFileFolderExists) {
            fs.mkdir(path.join(__dirname, '../../../', payload.destination));
        }
        await fs.writeFile(fullFilePath, payload.file.buffer);
        const imageUrl = `${payload.destination}/${fileName}`;
        return {
            imageUrl,
            message: 'File written successfully',
        };
    }
    async removeFile(payload) {
        const filePath = path.join(__dirname, '../../../', payload.fileName);
        const isFileExists = (0, fs_1.existsSync)(filePath);
        if (isFileExists) {
            await fs.unlink(filePath);
        }
        return {
            message: 'File removed successfully',
        };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map