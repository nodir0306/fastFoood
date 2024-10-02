import { IsNotEmpty, IsString } from "class-validator";
import { UpdateCategoryRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto implements Omit<UpdateCategoryRequest, "id"> {
    @ApiProperty({
        example: "Burgers update",
        description:"Category update name",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}