import { Food } from './models';
import { CreateFoodRequest } from './interfaces';
import { UploadService } from '../upload';
import { UpdateFoodRequest } from './interfaces/update-food.interfaces';
export declare class FoodService {
    #private;
    private foodModel;
    constructor(foodModel: typeof Food, upload: UploadService);
    getAllFoods(): Promise<Food[]>;
    createFood(payload: CreateFoodRequest): Promise<void>;
    updateFood(id: number, payload: UpdateFoodRequest): Promise<void>;
    deleteFood(id: string): Promise<void>;
    createDailyTopFood(id: number): Promise<void>;
}
