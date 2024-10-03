import { User } from './models';
import { UserService } from './users.service';
import { CreateUserDto } from './dto';
export declare class UserController {
    private service;
    constructor(service: UserService);
    getAllUsers(): Promise<User[]>;
    createUser(payload: CreateUserDto, image: Express.Multer.File): Promise<void>;
    deleteUser(userId: number): Promise<void>;
}
