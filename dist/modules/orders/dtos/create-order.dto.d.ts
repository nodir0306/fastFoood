import { CreateOrderRequest, OrderItemInterface } from '../interfaces';
export declare class CreateOrderDto implements CreateOrderRequest {
    orderItems: OrderItemInterface[];
    userId: number;
    totalPrice: number;
}
