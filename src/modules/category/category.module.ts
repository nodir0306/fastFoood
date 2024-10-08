import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  providers: [CategoryService,JwtService],
  controllers: [CategoryController],
})
export class CategoryModule {}
