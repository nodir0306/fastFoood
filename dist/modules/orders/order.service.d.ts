import { Order, OrderItem } from './models';
import { Food } from '../food';
import { CreateOrderRequest } from './interfaces';
export declare class OrderService {
    private orderModel;
    private foodModel;
    private orderItemModel;
    constructor(orderModel: typeof Order, foodModel: typeof Food, orderItemModel: typeof OrderItem);
    getAllOrders(): Promise<Order[]>;
    createOrder(payload: CreateOrderRequest): Promise<void>;
    deleteOrder(id: number): Promise<void>;
}
