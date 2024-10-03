import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService, UsersModule } from '../users';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UsersModule)private readonly usersService: UsersModule,
    private readonly jwtService: JwtService,
  ) {}

  
  async validateUser(phone: string, pass: string): Promise<any> {
    try {
      
      const users = await this.usersService.findAll();
      const user = users.find(user => user.phone === phone);

      
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new Error('User validation failed');
    }
  }


  async login(user: any) {
    const payload = { phone: user.phone, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
