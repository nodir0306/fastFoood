import {
  BadRequestException,
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import {
  JsonWebTokenError,
  JwtService,
  NotBeforeError,
  TokenExpiredError,
} from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Protected } from 'src/decorators';

export declare interface RequestIntefaces extends Request {
  userId: string | undefined;
  role: string | undefined;
}

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestIntefaces>();

    const isProtected = this.reflector.get(Protected, context.getHandler());

    const bearerToken = request.headers['authorization'];

    if(!isProtected){
      return true
    }
    if (
      !(
        bearerToken &&
        bearerToken.startsWith('Bearer ') &&
        bearerToken.split('Bearer ')[1]?.length
      )
    ) {
      throw new BadRequestException('Please provide a valid bearer token');
    }
    const token = bearerToken.split('Bearer ')[1];

    try { 
      this.jwtService.verify(token, this.configService.get('jwt.accessKey'));
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Token arleady expired');
      }
      if (error instanceof NotBeforeError) {
        throw new ConflictException('Token not before error');
      }
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(error.message);
      }
      return false;
    }
    const userDecodedData = this.jwtService.decode(token);
    request.userId = userDecodedData?.id;
    request.role = "user";
    console.log(token)
    return true;
  }
}
