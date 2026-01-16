import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'taho',
      entities: [User],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',      // SMTP server bạn dùng (Mailgun, Gmail, SendGrid SMTP…)
        port: 587,                     // port mail server
        secure: false,                 // true nếu dùng SSL/TLS (phụ thuộc server)
        auth: {
          user: process.env.EMAIL_USER, // username SMTP
          pass: process.env.EMAIL_PASS, // mật khẩu SMTP

        },
      },
      defaults: {
        from: '"No Reply" <ducthao.>', // địa chỉ gửi mặc định
      },

    }),

  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService
  ],
})
export class AppModule { }
