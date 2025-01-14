import { Module } from '@nestjs/common';
import { postService } from './post.service';
import { postController } from './post.controller';
import { postProviders } from './post.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [...postProviders, postService],
  controllers: [postController],
})
export class PostModule {}
