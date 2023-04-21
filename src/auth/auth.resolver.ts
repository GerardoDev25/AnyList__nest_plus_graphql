import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SingnUpInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('singnUpInput') singnUpInput: SingnUpInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(singnUpInput);
  }

  // @Mutation(() => String, { name: 'login' })
  // async login(): Promise<any> {
  //   // return this.authService.login();
  // }

  // @Query(() => String, { name: 'revalidate' })
  // async revalidateToken(): Promise<any> {
  //   // return this.authService.revalidateToken();
  // }
}
