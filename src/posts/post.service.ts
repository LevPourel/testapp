import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { Post } from './post.entity';
import axios from 'axios';
import { PostsDTO } from './dto/post.dto';

@Injectable()
export class postService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postsRepository: typeof Post,
  ) {}
  async generatePosts(user) {
    const createdPosts = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    return createdPosts.data.forEach(async (itm) => {
      await this.postsRepository.create({
        body: itm.body,
        title: itm.title,
        userId: user.sub,
      });
    });
  }

  async updatePost(req: any, payload: PostsDTO) {
    const post = await this.postsRepository.findOne({
      where: { id: payload.id },
    });
    if (post.userId === req.user.sub) {
      return await this.postsRepository.update(
        { ...payload },
        { where: { id: payload.id } },
      );
    } else {
      throw new ForbiddenException('Access Denied');
    }
  }

  async getAllPosts(user: number) {
    return this.postsRepository.findAll({
      where: { userId: user },
    });
  }

  async createPost(req: any, payload: any) {
    const { body, title } = payload;
    return this.postsRepository.create({
      body,
      title,
      userId: req.sub,
    });
  }

  async deletePost(req: any, body: any) {
    const check = await this.postsRepository.findByPk(body.id);
    if (check.userId === req.user.sub) {
      return this.postsRepository.destroy({ where: { id: body.id } });
    } else {
      throw new ForbiddenException('Access Denied');
    }
  }
}
