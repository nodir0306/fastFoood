export declare interface CreateUserRequest {
    name: string;
    phone: string;
    email: string;
    image?: Express.Multer.File;
}
export declare interface UpdateUserInterface {
    name?: string;
    phone?: string;
    email?: string;
    image?: string;
}
