import { User } from './models';
import { CreateUserRequest } from './interfaces';
import { UploadService } from '../upload';
export declare class UserService {
    private userModel;
    private uploadService;
    constructor(userModel: typeof User, uploadService: UploadService);
    getAllUsers(): Promise<User[]>;
    createUser(payload: CreateUserRequest): Promise<void>;
    deleteUser(userId: number): Promise<void>;
}
