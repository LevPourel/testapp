import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDTO {
  @ApiProperty({
    description: 'User email address',
    default: 'johndoe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', default: 'qwerty1234' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
