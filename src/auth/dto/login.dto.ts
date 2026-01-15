import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Email is not empty ! ' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @IsNotEmpty({ message: 'Password is not empty ! ' })
    @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
    password: string;
}
