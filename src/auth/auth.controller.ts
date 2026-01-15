

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
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

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async handleLogout(@Request() req) {
    return req.logout();
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
