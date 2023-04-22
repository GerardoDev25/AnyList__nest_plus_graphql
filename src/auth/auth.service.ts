import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginInput, SingnUpInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';

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

    if (!bcrypt.compareSync(loginInput.password, user.password)) {
      throw new BadRequestException(`Email or password incorrect`);
    }

    // todo token
    return {
      token: '123',
      user,
    };
  }
}
