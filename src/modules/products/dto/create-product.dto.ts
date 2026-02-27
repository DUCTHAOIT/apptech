import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsNumber()
    categoryId: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    shortDesc?: string;

    @IsOptional()
    content?: string;
}
