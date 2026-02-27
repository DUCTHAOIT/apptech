import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsIn,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsIn(['USER', 'ADMIN'])
    role?: 'USER' | 'ADMIN';

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    codeId?: string;

    @IsOptional()
    @IsDateString()
    codeExpired?: Date;
}
