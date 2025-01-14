import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { postService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PostsDTO } from './dto/post.dto';
import { ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';

@Controller('/post')
export class postController {
  constructor(private readonly postService: postService) {}

  @Post('/generate')
  @ApiOperation({
    summary: 'Geting posts from JSONPlaceholder API and saving it',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your-token-here',
  })
  @UseGuards(JwtAuthGuard)
  async generatePosts(@Request() req) {
    return this.postService.generatePosts(req.user);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Geting all user`s posts',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your-token-here',
  })
  async getPosts(@Request() req) {
    return this.postService.getAllPosts(req.user.sub);
  }

  @Put('')
  @ApiBody({
    schema: {
      example: {
        id: 123,
        title: 'Lorem Ipsum',
        body: 'TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT',
      },
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your-token-here',
  })
  @ApiOperation({
    summary: 'Updating post',
  })
  @UseGuards(JwtAuthGuard)
  async updatePost(@Request() req, @Body() body: PostsDTO) {
    return this.postService.updatePost(req, body);
  }

  @Post('')
  @ApiBody({
    schema: {
      example: {
        id: 123,
        title: 'Lorem Ipsum',
        body: 'TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT',
      },
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your-token-here',
  })
  @ApiOperation({
    summary: 'Creating Post',
  })
  @UseGuards(JwtAuthGuard)
  async createPost(@Request() req, @Body() body) {
    return this.postService.createPost(req.user, body);
  }

  @Delete('')
  @ApiBody({
    schema: {
      example: {
        id: 123,
      },
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your-token-here',
  })
  @ApiOperation({
    summary: 'Deleting Post',
  })
  @UseGuards(JwtAuthGuard)
  async deletePost(@Request() req, @Body() body: { id: number }) {
    return this.postService.deletePost(req, body);
  }
}
