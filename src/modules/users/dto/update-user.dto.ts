import {
    IsEmail,
    IsNotEmpty
} from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

}
