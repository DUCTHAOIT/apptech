import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
    password: string;
}
