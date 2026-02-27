import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import dayjs from 'dayjs';
import { hashPasswordHelper } from 'src/helpers/util';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly mailService: MailService
  ) { }

  /* ================== COMMON ================== */

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email } });
    return !!user;
  }

  /* ================== CRUD ================== */

  async create(dto: CreateUserDto) {
    const { name, email, password } = dto;

    const existingUser = await this.userRepo.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        `Email ${email} đã tồn tại. Vui lòng chọn email khác`,
      );
    }

    const hashPassword = await hashPasswordHelper(password);
    const isActive = true;
    const user = this.userRepo.create({
      name,
      email,
      password: hashPassword,
      isActive
    });

    const savedUser = await this.userRepo.save(user);

    return savedUser;
  }

  async findAll() {
    const [results, total] = await this.userRepo.findAndCount({
      select: [
        'userId',
        'name',
        'email',
        'address',
        'phone',
        'role',
        'createdAt',
        'updatedAt',
        'isActive',
      ],
      order: { userId: 'DESC' },
    });

    return {
      results,
    };
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
  async findOne(userId: number) {
    return this.userRepo.findOne({ where: { userId } });
  }


  async update(userId: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { userId },
    });

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    await this.userRepo.update(userId, dto);

    return { userId, dto };
  }

  async remove(id: number) {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException('User không tồn tại');
    }
    return { id };
  }

  /* ================== AUTH ================== */

  async handleRegister(dto: any) {
    const { name, email, password } = dto;

    if (await this.isEmailExist(email)) {
      throw new BadRequestException(`Email  ${email} đã tồn tại. Vui lòng chọn email khác !`);
    }

    const hashPassword = await hashPasswordHelper(password);
    const codeId = randomInt(100000, 1000000).toString();

    const user = this.userRepo.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });
    // console.log('check email:  ', user.email)
    const savedUser = await this.userRepo.save(user);
    //send email
    await this.mailService.sendRegister(email, codeId);

    return {
      userId: user.userId
    }

  }

  async handleActive(data: { userId: number; code: string }) {
    const user = await this.userRepo.findOne({
      where: { userId: data.userId, codeId: data.code },
    });

    if (!user) {
      throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
    }

    if (!dayjs().isBefore(user.codeExpired)) {
      throw new BadRequestException('Mã code đã hết hạn');
    }

    await this.userRepo.update(user.userId, {
      isActive: true,
      codeId: "",
      codeExpired: "",
    });

    return { success: true };
  }

  async retryActive(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) throw new BadRequestException('Tài khoản không tồn tại');
    if (user.isActive)
      throw new BadRequestException('Tài khoản đã được kích hoạt');

    const codeId = randomInt(100000, 1000000).toString();

    await this.userRepo.update(user.userId, {
      codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });

    // return { id: user.userId };
    //send email
    await this.mailService.sendRegister(email, codeId);
    // return {
    //   message: 'Gửi mã code thành công, vui lòng kiểm tra email để hoàn tất đăng ký.',
    // };
    return { userId: user.userId };
  }

  async changePassword(data: any) {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      throw new BadRequestException('Mật khẩu không khớp');
    }

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Tài khoản không tồn tại');

    if (!dayjs().isBefore(user.codeExpired)) {
      throw new BadRequestException('Mã code đã hết hạn');
    }

    const newPassword = await hashPasswordHelper(password);

    await this.userRepo.update(user.userId, {
      password: newPassword,
      codeId: "",
      codeExpired: "",
    });

    return { success: true };
  }
  // kiểm tra lại logic
  async retryPassword(email: string) {
    //check email 
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Tài khoản không tồn tại');
    const codeId = randomInt(100000, 1000000).toString();

    await this.userRepo.update(user.userId, {
      codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });
    await this.mailService.sendResetPassword(email, codeId);
    return {
      message: 'Kiểm tra email xác nhận mật khẩu mới',
    };
  }
}
