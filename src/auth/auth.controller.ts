

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async handLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  register(@Body() registerDto: createUserDto) {
    return this.authService.handleRegister(registerDto);
  }

}
