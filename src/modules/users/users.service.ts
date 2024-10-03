import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { CreateUserRequest } from './interfaces';
import { UploadFileResponse, UploadService } from '../upload';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private uploadService: UploadService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async createUser(payload: CreateUserRequest): Promise<void> {
    let imageUrl: null | UploadFileResponse = null;

    if (payload?.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads/users',
        file: payload.image,
      });
    }

    await this.userModel.create({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      image: imageUrl ? imageUrl?.imageUrl : '',
    });
  }

  async deleteUser(userId: number): Promise<void> {
    const foundedUser = await this.userModel.findByPk(userId);

    if (foundedUser?.image) {
      await this.uploadService.removeFile({ fileName: foundedUser.image });
    }

    await this.userModel.destroy({ where: { id: userId } });
  }
}
