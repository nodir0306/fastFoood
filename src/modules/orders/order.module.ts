import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order, OrderItem } from './models';
import { Food } from '../food';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItem, Food])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}