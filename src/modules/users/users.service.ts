import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';


import { UploadService } from '../upload';
import * as path from 'path';
import * as fs from 'fs';
import { Users } from './models';
import { CreateUserDto } from './dto';
import { CreateUserInterface } from './interfaces/create-user.interfaces';

@Injectable()
export class UserService {
  #_uploadService: UploadService;

  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    upload: UploadService,
  ) {
    this.#_uploadService = upload;
  }

  async getAllUsers(): Promise<Users[]> {
    return await this.userModel.findAll();
  }

  async createUser(payload: CreateUserDto, image?: Express.Multer.File ): Promise<void> {
    let imageUrl = 'user-image.jpg';
    if (image) {
      const fileOptions = await this.#_uploadService.uploadFile({
        file: image,
        destination: 'uploads/users',
      });
      imageUrl = fileOptions.imageUrl;
    }

    await this.userModel.create({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      image: imageUrl,
    });
  }

  async updateUser(id: number, payload: CreateUserDto & { image?: string }): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    let updatedImage = user.image;
    if (payload.image) {
      // Handle new image upload
      const fileOptions = await this.#_uploadService.uploadFile({
        file: payload.image,
        destination: 'uploads/users',
      });
      updatedImage = fileOptions.imageUrl;

      // Delete old image
      const oldImagePath = path.join(__dirname, '../../uploads', user.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await this.userModel.update(
      {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        image: updatedImage,
      },
      { where: { id } },
    );
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (user && user.image) {
      const imagePath = path.join(__dirname, '../../uploads', user.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await this.userModel.destroy({ where: { id } });
  }
}
