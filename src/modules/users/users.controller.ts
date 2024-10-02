import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerConfig } from '@config';
import { UserService } from './users.service';
import { Users } from './models';
import { CreateUserDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  #_service: UserService;

  constructor(service: UserService) {
    this.#_service = service;
  }

  @Get()
  async getAllUsers(): Promise<Users[]> {
    return await this.#_service.getAllUsers();
  }

  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createUser(
    @Body() createUserPayload: CreateUserDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<void> {
    await this.#_service.createUser({
      ...createUserPayload,
      image: image,
    });
  }

  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserPayload: CreateUserDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<void> {
    await this.#_service.updateUser(id, { ...updateUserPayload, image: image?.originalname });
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteUser(id);
  }
}
