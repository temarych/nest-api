import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  public firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
