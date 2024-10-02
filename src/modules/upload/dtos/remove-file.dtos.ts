import { IsNotEmpty, IsString } from 'class-validator';
import { RemoveFileRequest } from '../interfaces';

export class RemoveFileDto implements RemoveFileRequest {
  @IsString()
  @IsNotEmpty()
  fileName: string;
}
