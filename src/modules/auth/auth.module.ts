import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; 
import { CheckAuthGuard } from './check-auth.guard';
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', 
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule, 
  ],
  providers: [AuthService, JwtStrategy, CheckAuthGuard],
  exports: [AuthService, CheckAuthGuard],
})
export class AuthModule {}
