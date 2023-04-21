import { Injectable } from '@nestjs/common';
import { SingnUpInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  async signup(singnUpInput: SingnUpInput): Promise<AuthResponse> {
    console.log(singnUpInput);
    throw new Error('not implemented');

    // return {
    //   token: '',
    //   user: new User(),
    // };
  }
}
