import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class ModifyMovieDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly ageRestriction: number;
}
