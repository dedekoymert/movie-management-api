import { IsInt, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsInt()
  readonly age: number;
}
