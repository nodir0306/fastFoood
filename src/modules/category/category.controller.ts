import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './models';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from 'src/guards/check-auth.guard';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  #_service: CategoryService;

  constructor(service: CategoryService) {
    this.#_service = service;
  }

  @ApiOperation({
    description: 'Barcha categoriesni olish',
    summary: 'Barchasini olish',
  })

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.#_service.getAllCategories();
  }

  @Post('/add')
  async createCategory(
    @Body() createCategoryPayload: CreateCategoryDto,
  ): Promise<void> {
    await this.#_service.createCategory(createCategoryPayload);
  }

  @Put('/edit/:categoryId')
  async updateCategory(
    @Body() updateCategoryPayload: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.#_service.updateCategory({
      ...updateCategoryPayload,
      id: categoryId,
    });
  }

  @Delete('/delete/:categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.#_service.deleteCategory(categoryId);
  }
}
