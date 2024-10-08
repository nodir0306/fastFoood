import { Role } from "@decorators";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class CheckRoleGuard implements CanActivate {

    constructor(
        private reflector : Reflector
    ){}

    canActivate(context: ExecutionContext)
        : boolean
        | Promise<boolean>
        | Observable<boolean> {

        const ctx = context.switchToHttp()
        const request = ctx.getRequest<Request>()

        const roles = this.reflector.get(Role,context.getHandler())
        

        if(!(roles.includes(String(request.headers.role))))
            throw new ForbiddenException('You have not access to this enpoint')

        return true

        
    }
}
