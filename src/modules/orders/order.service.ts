import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order, OrderItem } from './models';

import { Food } from '../food';
import { CreateOrderRequest } from './interfaces';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(Food) private foodModel: typeof Food,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderModel.findAll({
      include: OrderItem,
    });
  }

  async createOrder(payload: CreateOrderRequest): Promise<void> {
    const order = await this.orderModel.create({
      total_price: payload.totalPrice,
      user_id: payload.userId,
    });

    for (const orIt of payload.orderItems) {
      const food = await this.foodModel.findByPk(orIt.foodId);
      await this.orderItemModel.create({
        food_id: orIt.foodId,
        order_id: order.id,
        quantity: orIt.quantity,
        total_price: orIt.quantity * food.price,
      });
    }
  }
  async deleteOrder(id: number): Promise<void> {
    await this.orderModel.destroy({
      where: {
        id,
      },
    });
  }
}