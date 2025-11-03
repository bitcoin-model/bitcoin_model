import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
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

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: FastifyReply) {
    const { user, token, expiresIn } = await this.authService.register(dto);
    res.setCookie(this.cookieName, token, this.cookieOptions);
    return { user: this.serializeUser(user), expiresIn };
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: FastifyReply) {
    const { user, token, expiresIn } = await this.authService.login(dto.email, dto.password);
    res.setCookie(this.cookieName, token, this.cookieOptions);
    return { user: this.serializeUser(user), expiresIn };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: FastifyReply) {
    res.clearCookie(this.cookieName, { path: '/' });
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: any) {
    return this.serializeUser(user);
  }

  private serializeUser(user: any) {
    const { password, ...rest } = user;
    return rest;
  }
}
