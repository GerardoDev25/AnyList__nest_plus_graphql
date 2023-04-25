import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginInput, SingnUpInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
  }

  async signup(singnUpInput: SingnUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(singnUpInput);

    return {
      token: this.getToken(user.id),
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(loginInput.email);

    if (!bcrypt.compareSync(loginInput.password, user.password)) {
      throw new BadRequestException(`Email or password incorrect`);
    }

    return {
      token: this.getToken(user.id),
      user,
    };
  }

  revalidateToken(user: User): AuthResponse {
    console.log(user);
    throw new Error('Method not implemented.');
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findById(id);

    if (!user.isActive) {
      throw new UnauthorizedException(
        `user is not active please talk with an admin`,
      );
    }

    delete user.password;
    return user;
  }
}
