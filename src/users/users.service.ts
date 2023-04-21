import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SingnUpInput } from 'src/auth/dto/inputs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private looger = new Logger('UserService');

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(singnUpInput: SingnUpInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...singnUpInput,
        password: bcrypt.hashSync(singnUpInput.password, 10),
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string): Promise<User> {
    throw new Error(`This action returns a #${id} user`);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error(`This action returns a #${id} user`);
  }

  private handleDBError(error: any): never {
    this.looger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('key ', ''));
    }
    throw new InternalServerErrorException('please check server logs');
  }
}
