import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersModule, jwtService: JwtService);
    validateUser(phone: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
