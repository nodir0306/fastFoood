import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { appConfig, dbConfig, jwtConfig } from '@config';
import {
  Category,
  CategoryModule,
  Food,
  FoodModule,
  UploadModule,
  User,
  UsersModule,
} from '@modules';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mySecret',
      signOptions: { expiresIn: '60m'},
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig,jwtConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get('database.host'),
            port: config.get<number>('database.port'),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [Category, Food, User],
            synchronize: true,
            logging: false,
            autoLoadModels: true,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    CategoryModule,
    FoodModule,
    UploadModule,
    UsersModule,
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ]
})
export class AppModule {}
