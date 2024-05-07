import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogInRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'example@example.com' })
  public email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'admin123' })
  public password: string;
}
