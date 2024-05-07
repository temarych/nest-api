import { IsOptional } from 'class-validator';

export class UpdatePostRequestDto {
  @IsOptional()
  public title?: string;

  @IsOptional()
  public description?: string;
}
