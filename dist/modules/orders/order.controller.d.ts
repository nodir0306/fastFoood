import { OrderService } from './order.service';
import { Order } from './models';
import { CreateOrderDto } from './dtos';
export declare class OrderController {
    #private;
    constructor(service: OrderService);
    getOrders(): Promise<Order[]>;
    createOrder(createOrderPayload: CreateOrderDto): Promise<void>;
    deleteOrder(orderId: number): Promise<void>;
}
