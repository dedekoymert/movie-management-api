import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class AddMovieDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsInt()
  @IsPositive()
  readonly ageRestriction: number;

  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => AddSessionDto)
  // readonly sessions: AddSessionDto[];
}
