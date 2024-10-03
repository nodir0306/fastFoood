import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; // Strategy for validating tokens
import { CheckAuthGuard } from './check-auth.guard'; // Guard
import { UsersModule } from '../users/users.module'; // Importing UsersModule for user verification

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with environment variable in production
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
    UsersModule, // For user-related services (like user validation)
  ],
  providers: [AuthService, JwtStrategy, CheckAuthGuard],
  exports: [AuthService, CheckAuthGuard],
})
export class AuthModule {}
