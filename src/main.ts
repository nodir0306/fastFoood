import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { AppModule } from './app';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // SET GLOBAL PREFIX TO /api/v1
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Feane restaurant API')
    .setDescription('The feane API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // USE MORGAN IN DEVELOPMENT MODE
  if (process.env?.NODE_ENV?.trim() == 'development') {
    app.use(morgan('tiny'));
  }

  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on ${configService.get<number>('appConfig.port')}`);
  });
}
bootstrap();
