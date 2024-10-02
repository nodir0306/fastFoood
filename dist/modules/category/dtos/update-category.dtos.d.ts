import { UpdateCategoryRequest } from "../interfaces";
export declare class UpdateCategoryDto implements Omit<UpdateCategoryRequest, "id"> {
    name: string;
}
