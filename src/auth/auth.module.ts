import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '100d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
