import { Model } from 'sequelize-typescript';
export declare class OrderItem extends Model {
    id: number;
    total_price: number;
    quantity: number;
    order_id: number;
    user_id: number;
}
