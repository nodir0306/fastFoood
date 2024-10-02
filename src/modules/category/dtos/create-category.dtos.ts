import { IsNotEmpty, IsString } from "class-validator";
import { CreateCategoryRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto implements CreateCategoryRequest {
    @ApiProperty({
        type: "string",
        example: "Burgers",
        description: "Category nomi berilishi shart",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}