import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { OrderService } from './order.service';
  import { Order } from './models';
import { CreateOrderDto } from './dtos';

  
  @ApiTags('Orders')
  @Controller('orders')
  export class OrderController {
    #_service: OrderService;
  
    constructor(service: OrderService) {
      this.#_service = service;
    }
  
    @ApiOperation({
      description: 'Barcha orderlarni olish',
      summary: 'Barchasini olish',
    })
    @Get()
    async getOrders(): Promise<Order[]> {
      return await this.#_service.getAllOrders();
    }
  
    @Post('/add')
    async createOrder(@Body() createOrderPayload: CreateOrderDto): Promise<void> {
      await this.#_service.createOrder(createOrderPayload);
    }
  
    @Delete('/delete/:orderId')
    async deleteOrder(
      @Param('orderId', ParseIntPipe) orderId: number,
    ): Promise<void> {
      await this.#_service.deleteOrder(orderId);
    }
  }