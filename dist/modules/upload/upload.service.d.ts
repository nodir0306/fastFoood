import { RemoveFileRequest, RemoveFileResponse, UploadFileRequest, UploadFileResponse } from './interfaces';
export declare class UploadService {
    constructor();
    uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse>;
    removeFile(payload: RemoveFileRequest): Promise<RemoveFileResponse>;
}
