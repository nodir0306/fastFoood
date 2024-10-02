import { Model } from 'sequelize-typescript';
import { Food } from '@modules';
export declare class Category extends Model {
    id: number;
    name: string;
    foods: Food[];
}
