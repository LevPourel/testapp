import { Post } from './post.entity';

export const postProviders = [
  {
    provide: 'POST_REPOSITORY',
    useValue: Post,
  },
];
