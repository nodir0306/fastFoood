export declare interface CreateFoodRequest {
    name: string;
    description: string;
    price: number;
    image: Express.Multer.File;
    categoryId: number;
}