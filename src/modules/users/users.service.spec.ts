import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  // CREATE
  async create(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  // READ ALL
  findAll() {
    return this.userRepo.find();
  }

  // READ ONE
  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User không tồn tại');
    return user;
  }

  // UPDATE
  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  // DELETE
  async remove(id: number) {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('User không tồn tại');
    return { message: 'Xoá thành công' };
  }
}
