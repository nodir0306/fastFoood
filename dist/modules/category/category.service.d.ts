import { Category } from './models';
import { CreateCategoryRequest, UpdateCategoryRequest } from './interfaces';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: typeof Category);
    getAllCategories(): Promise<Category[]>;
    createCategory(payload: CreateCategoryRequest): Promise<void>;
    updateCategory(payload: UpdateCategoryRequest): Promise<void>;
    deleteCategory(id: number): Promise<void>;
}
