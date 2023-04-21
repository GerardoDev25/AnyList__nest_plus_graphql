import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String, { name: 'signup' })
  async signup(): Promise<any> {
    // return this.authService.signup();
  }

  @Mutation(() => String, { name: 'login' })
  async login(): Promise<any> {
    // return this.authService.login();
  }

  @Query(() => String, { name: 'revalidate' })
  async revalidateToken(): Promise<any> {
    // return this.authService.revalidateToken();
  }
}
