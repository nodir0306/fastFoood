import { RemoveFileResponse, UploadFileResponse } from './interfaces';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dtos/upload-file.dto';
import { RemoveFileDto } from './dtos';
export declare class UploadController {
    private service;
    constructor(service: UploadService);
    uploadFile(payload: UploadFileDto, file: Express.Multer.File): Promise<UploadFileResponse>;
    removeFile(payload: RemoveFileDto): Promise<RemoveFileResponse>;
}
