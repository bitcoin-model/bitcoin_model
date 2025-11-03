import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private get tokenExpirySeconds(): number {
    return this.configService.get<number>('JWT_EXPIRY_SECONDS') ?? 60 * 60 * 24;
  }

  async register(dto: RegisterDto) {
    const passwordHash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        password: passwordHash,
        name: dto.name,
      },
    });

    const token = await this.generateToken(user.id);
    const { password, ...safeUser } = user;
    return { user: safeUser, token, expiresIn: this.tokenExpirySeconds };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.generateToken(user.id);
    const { password: _password, ...safeUser } = user;
    return { user: safeUser, token, expiresIn: this.tokenExpirySeconds };
  }

  private async generateToken(userId: number): Promise<string> {
    return this.jwtService.signAsync({ sub: userId });
  }
}
