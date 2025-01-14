import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });
      sequelize.addModels([User, Post]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
