import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Protected } from 'src/decorators';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService, 
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();


    const isProtected = this.reflector.get(Protected, context.getHandler());

    if (!isProtected) {
      return true;
    }
    const bearerToken = request.headers['authorization'];
    if (
      !(bearerToken &&
      bearerToken.startsWith('Bearer ') &&
      bearerToken.split('Bearer ')[1]?.length)
    ) {
      throw new BadRequestException('Please provide a valid bearer token');
    }
    const token = bearerToken.split('Bearer ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
