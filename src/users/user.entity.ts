import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Post } from 'src/posts/post.entity';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Post)
  posts: Post[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken: string | null;
}
