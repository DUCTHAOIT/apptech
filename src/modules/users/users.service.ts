import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { createUserDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    // private readonly mailService: MailService,
  ) { }

  async create(dto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email đã tồn tại');
    }

    try {
      const user = this.userRepo.create(dto);
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL duplicate key
        throw new ConflictException('Email đã tồn tại');
      }
      throw error;
    }
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User không tồn tại');
    return user;
  }

  // ✅ THÊM HÀM NÀY
  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('User không tồn tại');
    return { message: 'Xoá thành công' };
  }
  //codeExpired: dayjs().add(5, 'minute'),
  async handleRegister(registerDto: createUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email đã tồn tại');
    }

    const codeId = uuidv4();
    const codeExpired = dayjs().add(5, 'minute').toDate(); // ✅ FIX

    try {
      const user = this.userRepo.create({
        ...registerDto,
        isActive: false,
        codeId,
        codeExpired,
      });

      await this.userRepo.save(user);



      return {
        message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản',
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email đã tồn tại');
      }
      throw error;
    }
  }

}
