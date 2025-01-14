import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  @ApiOperation({
    summary: 'Registration',
  })
  async signingUp(@Body() body: UserDTO): Promise<UserDTO> {
    return this.userService.createUser(body.email, body.password);
  }

  @Post('/sign-out')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your-token-here',
  })
  @ApiOperation({
    summary: 'Log out',
  })
  @UseGuards(JwtAuthGuard)
  async signingOut(@Request() req) {
    return this.userService.invalidateRefreshToken(req.user.sub);
  }
}
