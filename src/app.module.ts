import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
// import { User } from './users/entities/user.entity';
@Module({
  imports: [
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

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
