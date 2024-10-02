import { CreateFoodRequest } from '../interfaces';
export declare class CreateFoodDto implements Omit<CreateFoodRequest, 'image'> {
    name: string;
    description: string;
    price: number;
    image: any;
    categoryId: number;
}
