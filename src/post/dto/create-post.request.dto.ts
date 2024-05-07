import { IsNotEmpty } from 'class-validator';

export class CreatePostRequestDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public description: string;
}
