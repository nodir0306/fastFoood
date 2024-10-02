import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateFoodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
