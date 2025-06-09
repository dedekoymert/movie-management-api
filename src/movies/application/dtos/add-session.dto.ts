import { Transform } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsPositive, MinDate } from 'class-validator';
import { TimeSlot } from 'src/movies/domain/time-slot.enum';

export class AddSessionDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  readonly date: Date;

  @IsPositive()
  readonly roomNumber: number;

  @IsIn(Object.values(TimeSlot))
  readonly timeSlot: TimeSlot;
}
