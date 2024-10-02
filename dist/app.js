"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const serve_static_1 = require("@nestjs/serve-static");
const _config_1 = require("./config");
const _modules_1 = require("./modules");
const users_module_1 = require("./modules/users/users.module");
const models_1 = require("./modules/users/models");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [_config_1.appConfig, _config_1.dbConfig],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: "/uploads",
                rootPath: "./uploads"
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    try {
                        return {
                            dialect: 'postgres',
                            host: config.get('database.host'),
                            port: config.get('database.port'),
                            username: config.get('database.user'),
                            password: config.get('database.password'),
                            database: config.get('database.dbName'),
                            models: [_modules_1.Category, _modules_1.Food, models_1.Users],
                            synchronize: true,
                            logging: console.log,
                            autoLoadModels: true,
                        };
                    }
                    catch (error) {
                        console.log(error);
                    }
                },
            }),
            _modules_1.CategoryModule,
            _modules_1.FoodModule,
            _modules_1.UploadModule,
            users_module_1.UsersModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.js.map