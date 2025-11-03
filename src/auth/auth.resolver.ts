import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthPayload } from './models/auth-payload.model';
import { UserModel } from './models/user.model';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  private get cookieName(): string {
    return this.configService.get<string>('JWT_COOKIE_NAME') ?? 'access_token';
  }

  private get cookieOptions() {
    const maxAge = Number(this.configService.get<number>('JWT_EXPIRY_SECONDS') ?? 60 * 60 * 24);
    const isSecure = this.configService.get<string>('NODE_ENV') === 'production';
    return {
      httpOnly: true,
      path: '/',
      secure: isSecure,
      sameSite: 'lax' as const,
      maxAge: maxAge * 1000,
    };
  }

  @Mutation(() => AuthPayload)
  async register(@Args('input') input: RegisterDto, @Context() context: any) {
    const { user, token, expiresIn } = await this.authService.register(input);
    context?.reply?.setCookie?.(this.cookieName, token, this.cookieOptions);
    return { user: this.serializeUser(user), expiresIn };
  }

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginDto, @Context() context: any) {
    const { user, token, expiresIn } = await this.authService.login(input.email, input.password);
    context?.reply?.setCookie?.(this.cookieName, token, this.cookieOptions);
    return { user: this.serializeUser(user), expiresIn };
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: any) {
    context?.reply?.clearCookie?.(this.cookieName, { path: '/' });
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel)
  async me(@Context() context: any) {
    return this.serializeUser(context.req.user);
  }

  private serializeUser(user: any) {
    const { password, ...rest } = user;
    return rest;
  }
}
