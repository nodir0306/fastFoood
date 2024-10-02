import { CategoryService } from './category.service';
import { Category } from './models';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
export declare class CategoryController {
    #private;
    constructor(service: CategoryService);
    getCategories(): Promise<Category[]>;
    createCategory(createCategoryPayload: CreateCategoryDto): Promise<void>;
    updateCategory(updateCategoryPayload: UpdateCategoryDto, categoryId: number): Promise<void>;
    deleteCategory(categoryId: number): Promise<void>;
}
