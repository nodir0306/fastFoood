import { Food } from './models';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dtos';
import { UpdateFoodDto } from './dtos/update-food.dto';
export declare class FoodController {
    #private;
    constructor(service: FoodService);
    getAllFoods(): Promise<Food[]>;
    createFood(createFoodPayload: CreateFoodDto, image: Express.Multer.File): Promise<void>;
    updateFood(id: number, updateFoodPayload: UpdateFoodDto, image: Express.Multer.File): Promise<void>;
    deleteFood(id: string): Promise<void>;
    createDailyTopFood(id: number, updateFoodPayload: UpdateFoodDto): Promise<void>;
}
