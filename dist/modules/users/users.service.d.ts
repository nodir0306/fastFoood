import { UploadService } from '../upload';
import { Users } from './models';
import { CreateUserDto } from './dto';
export declare class UserService {
    #private;
    private userModel;
    constructor(userModel: typeof Users, upload: UploadService);
    getAllUsers(): Promise<Users[]>;
    createUser(payload: CreateUserDto, image?: Express.Multer.File): Promise<void>;
    updateUser(id: number, payload: CreateUserDto & {
        image?: string;
    }): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
