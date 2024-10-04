export declare interface OrderItemInterface {
    foodId: number;
    quantity: number;
}
export declare interface CreateOrderRequest {
    userId: number;
    totalPrice: number;
    orderItems: OrderItemInterface[];
}
