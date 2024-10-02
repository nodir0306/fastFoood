import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { appConfig, dbConfig } from '@config';
import { Category, CategoryModule, Food, FoodModule, UploadModule } from '@modules';
import { UsersModule } from './modules/users/users.module';
import { Users } from './modules/users/models';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/uploads",
      rootPath: "./uploads"
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
            models: [Category, Food,Users],
            synchronize: true,
            // sync: {force: true},``
            logging: console.log,
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
    UsersModule
  ],
})
export class AppModule { }
