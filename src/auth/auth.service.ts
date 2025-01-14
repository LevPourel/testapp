import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(userId: number) {
    const payload = { sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async hashRefreshToken(token: string) {
    return await bcrypt.hash(token, 10);
  }

  async verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (Error) {
      throw new Error('Invalid refresh token');
    }
  }

  async compareRefreshTokens(token: string, hashedToken: string) {
    return await bcrypt.compare(token, hashedToken);
  }

  async verifyAccessToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch (Error) {
      console.log(Error);
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
