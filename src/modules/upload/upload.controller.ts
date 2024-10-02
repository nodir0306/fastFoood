import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RemoveFileResponse, UploadFileResponse } from './interfaces';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dtos/upload-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RemoveFileDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Upload")
@Controller('uploads')
export class UploadController {
  constructor(private service: UploadService) {}

  @Post('/add')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    return await this.service.uploadFile({ ...payload, file });
  }

  @Delete('/remove')
  async removeFile(
    @Body() payload: RemoveFileDto,
  ): Promise<RemoveFileResponse> {
    return this.service.removeFile(payload);
  }
}
