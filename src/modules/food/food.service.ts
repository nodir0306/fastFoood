import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Food } from './models';
import { CreateFoodRequest } from './interfaces';
import { UploadService } from '../upload';
import { UpdateFoodRequest } from './interfaces/update-food.interfaces';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FoodService {
  #_uploadService: UploadService;
  constructor(
    @InjectModel(Food) private foodModel: typeof Food,
    upload: UploadService,
  ) {
    this.#_uploadService = upload;
  }

  async getAllFoods(): Promise<Food[]> {
    return await this.foodModel.findAll();
  }

  async createFood(payload: CreateFoodRequest): Promise<void> {
    const fileOptions = await this.#_uploadService.uploadFile({
      file: payload.image,
      destination: 'uploads/foods',
    });

    await this.foodModel.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: fileOptions.imageUrl,
      category_id: payload.categoryId,
    });
  }

  async updateFood(id: number, payload: UpdateFoodRequest): Promise<void> {
    const food = await this.foodModel.findByPk(id);
    if (!food) {
      throw new NotFoundException(`Food item with ID ${id} not found`);
    }

    await this.foodModel.update(
      {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        image: payload.image || food.image,
        category_id: payload.categoryId,
      },
      { where: { id } },
    );
  }

  async deleteFood(id: string): Promise<void> {
    const food = await this.foodModel.findByPk(id);
    if (food && food.image) {
      const imagePath = path.join(__dirname, '../../uploads', food.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await this.foodModel.destroy({ where: { id } });
  }

  async createDailyTopFood(id: number): Promise<void> {
    try {
      const oldDailyFood = await this.foodModel.update(
        { isDailyTopFood: true },
        { where: { isDailyTopFood: false } },
      );

      await this.foodModel.update(
        { id: id },
        { where: { isDailyTopFood: true } },
      );
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
