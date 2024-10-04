import { Model } from 'sequelize-typescript';
import { OrderItem } from './order-item.model';
export declare enum OrderStatus {
    progress = 0,
    completed = 1,
    canceled = 2
}
export declare class Order extends Model {
    id: number;
    total_price: number;
    createdAt?: Date;
    status: OrderStatus;
    user_id: number;
    order_items: OrderItem[];
}
