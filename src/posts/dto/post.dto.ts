import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostsDTO {
  @ApiProperty({ default: 123, description: 'Id of the post' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ default: 123, description: 'Id of the post`s owner' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Lorem ipsum dolor sit amet , sdfsdf',
    description: 'text of the post',
  })
  body: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Lorem ipsum',
    description: 'Title of the post',
  })
  title: string;
}
