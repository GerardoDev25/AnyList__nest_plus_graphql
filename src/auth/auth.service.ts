import { Injectable } from '@nestjs/common';

import { LoginInput, SingnUpInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(singnUpInput: SingnUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(singnUpInput);

    // todo crear token
    const token = '1234';

    return {
      token,
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(loginInput.email);

    return {
      token: '123',
      user,
    };
  }
}
