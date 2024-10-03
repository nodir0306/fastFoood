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
exports.CheckAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const decorators_1 = require("../decorators");
let CheckAuthGuard = class CheckAuthGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const isProtected = this.reflector.get(decorators_1.Protected, context.getHandler());
        if (!isProtected) {
            return true;
        }
        const bearerToken = request.headers['authorization'];
        if (!(bearerToken &&
            bearerToken.startsWith('Bearer ') &&
            bearerToken.split('Bearer ')[1]?.length)) {
            throw new common_1.BadRequestException('Please provide a valid bearer token');
        }
        const token = bearerToken.split('Bearer ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.CheckAuthGuard = CheckAuthGuard;
exports.CheckAuthGuard = CheckAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService])
], CheckAuthGuard);
//# sourceMappingURL=check-auth.guard.js.map