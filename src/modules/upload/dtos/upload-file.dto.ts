import { IsNotEmpty, IsString } from 'class-validator';
import { UploadFileRequest } from '../interfaces';

export class UploadFileDto implements Omit<UploadFileRequest, 'file'> {
  @IsString()
  @IsNotEmpty()
  destination: string;
}
