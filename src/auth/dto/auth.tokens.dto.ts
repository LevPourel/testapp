import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class TokensDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, {
    message: 'Invalid token format',
  })
  readonly accessToken: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, {
    message: 'Invalid token format',
  })
  readonly refreshToken: string;
}
