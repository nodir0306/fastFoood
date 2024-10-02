import { UserService } from './users.service';
import { Users } from './models';
import { CreateUserDto } from './dto';
export declare class UserController {
    #private;
    constructor(service: UserService);
    getAllUsers(): Promise<Users[]>;
    createUser(createUserPayload: CreateUserDto, image?: Express.Multer.File): Promise<void>;
    updateUser(id: number, updateUserPayload: CreateUserDto, image?: Express.Multer.File): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
