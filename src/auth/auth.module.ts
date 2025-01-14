import { Module } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { userProviders } from 'src/users/user.providers';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  providers: [JwtAuthGuard, AuthService, UserService, ...userProviders],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
