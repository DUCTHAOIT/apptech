import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/passport/local-auth.guard';
import { Public } from 'src/decorator/customize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  //Passport guard
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  // CREATE
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }


  // READ ALL
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // READ ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, dto);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
