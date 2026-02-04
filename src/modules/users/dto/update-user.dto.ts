import { IsOptional } from "class-validator";


export class UpdateUserDto {

    @IsOptional()
    name: string;

    @IsOptional()
    password: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    userId: number;
}

