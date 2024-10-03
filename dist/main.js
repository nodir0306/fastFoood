"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const morgan = require("morgan");
const app_1 = require("./app");
const swagger_1 = require("@nestjs/swagger");
const filters_1 = require("./filters");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory(errors) {
            const errorMsgs = errors.map((err) => Object.values(err.constraints).join(', '));
            throw new common_1.BadRequestException(errorMsgs.join(' && '));
        },
    }));
    app.setGlobalPrefix('/api/v1');
    app.useGlobalFilters(new filters_1.ExceptionHandlerFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Feane restaurant API')
        .setDescription('The feane API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    if (process.env?.NODE_ENV?.trim() == 'development') {
        app.use(morgan('tiny'));
    }
    await app.listen(configService.get('appConfig.port'), () => {
        console.log(`Listening on ${configService.get('appConfig.port')}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map