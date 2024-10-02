import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './models';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { UploadService } from '../upload';

@Module({
  imports: [SequelizeModule.forFeature([Food])],
  providers: [UploadService, FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
