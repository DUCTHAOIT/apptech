import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { createUserDto } from './dto/create-user.dto';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    if (user.password !== password) return null;

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      // user,
    };
  }

  handleRegister = async (registerDto: createUserDto) => {
    return await this.usersService.handleRegister(registerDto);
  }


}
