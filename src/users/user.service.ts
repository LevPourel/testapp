import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}
  async createUser(email, password) {
    const hashedPassword = this.hashingPassword(password);
    const [user, created] = await this.usersRepository.findOrCreate({
      where: { email },
      defaults: { password: hashedPassword },
    });
    if (created) {
      return user;
    } else {
      throw new ConflictException('User with this email is already exists');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) return null;
    return this.comparePassword(password, user.dataValues.password)
      ? user
      : null;
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    const user = await this.usersRepository.findByPk(userId);
    if (user) {
      await this.usersRepository.update(
        { refreshToken },
        { where: { id: userId } },
      );
    }
  }

  async invalidateRefreshToken(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (user) {
      await this.usersRepository.update(
        { refreshToken: null },
        { where: { id: id } },
      );
    }
  }

  async findById(userId: string) {
    return await this.usersRepository.findByPk(userId);
  }

  private comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  private hashingPassword(password: string) {
    const hash = bcrypt.hashSync(password, +process.env.SALT);

    return hash;
  }
}
