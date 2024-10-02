import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Food } from './models';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerConfig } from '@config';
import { UpdateFoodDto } from './dtos/update-food.dto';

@ApiTags('Foods')
@Controller('foods')
export class FoodController {
  #_service: FoodService;

  constructor(service: FoodService) {
    this.#_service = service;
  }

  @Get()
  async getAllFoods(): Promise<Food[]> {
    return await this.#_service.getAllFoods();
  }

  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createFood(
    @Body() createFoodPayload: CreateFoodDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.#_service.createFood({
      ...createFoodPayload,
      image: image,
    });
  }

  
  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateFood(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodPayload: UpdateFoodDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.#_service.updateFood(id, { ...updateFoodPayload, image: image?.originalname });
  }
  

  @Delete('/delete/:id')
  async deleteFood(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteFood(id);
  }


  @Patch('/top-food/:id')
  async createDailyTopFood(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodPayload: UpdateFoodDto,
  ): Promise<void> {
    await this.#_service.createDailyTopFood(id);
  }
}
