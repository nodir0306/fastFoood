import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateFoodRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDto implements Omit<CreateFoodRequest, 'image'> {
  @ApiProperty({
    type: String,
    example: 'Big Burger',
    required: true,
    description: 'Taom nomi berilishi shart',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Taom description',
    required: true,
    description: 'Taom izohi berilishi shart',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    example: 30000,
    required: true,
    description: 'Taom narxi berilishi shart',
  })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    description: 'Taom rasmi berilishi shart',
  })
  image: any;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Taom category idsi berilishi shart',
  })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
