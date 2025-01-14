import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, PostModule],
  providers: [AppService],
})
export class AppModule {}
