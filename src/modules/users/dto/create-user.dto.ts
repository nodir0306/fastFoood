import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
    required: true,
    description: 'Foydalanuvchi nomi berilishi shart',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: '998991210416',
    required: true,
    description: 'Foydalanuvchi telefon raqami berilishi shart',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    example: 'email@gmail.com',
    required: true,
    description: 'Foydalanuvchi elektron pochta manzili berilishi shart',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
    description: 'Foydalanuvchi rasmi (majburiy emas)',
  })
  image?: any;
}
