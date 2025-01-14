import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service';
import { UserDTO } from 'src/users/dto/user.dto';
import { TokensDTO } from './dto/auth.tokens.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
  })
  async login(@Body() body: UserDTO): Promise<TokensDTO> {
    const user = await this.usersService.validateUser(
      body.email,
      body.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.authService.generateTokens(user.id);

    const hashedRefreshToken = await this.authService.hashRefreshToken(
      tokens.refreshToken,
    );
    await this.usersService.saveRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refreshing Access Token',
  })
  @ApiBody({
    schema: {
      example: {
        refeshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2LCJpYXQiOjE3MzY4Njg1MjUsImV4cCI6MTczNjg2OTQyNX0.Wi323KP5xAW7KXPsxWf-8knTfxg15G-MzKRKFIED0yk',
      },
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your-token-here',
  })
  @UseGuards(JwtAuthGuard)
  async refresh(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const payload = await this.authService.verifyRefreshToken(refreshToken);

    const user = await this.usersService.findById(payload.sub);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = await this.authService.compareRefreshTokens(
      refreshToken,
      user.refreshToken,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.authService.generateTokens(user.id);

    const hashedRefreshToken = await this.authService.hashRefreshToken(
      tokens.refreshToken,
    );
    await this.usersService.saveRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }
}
