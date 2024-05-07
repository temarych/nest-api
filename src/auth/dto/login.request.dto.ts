import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogInRequestDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}
