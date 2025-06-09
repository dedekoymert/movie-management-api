import { Session } from 'src/movies/domain/session.entity';
import { TimeSlot } from 'src/movies/domain/time-slot.enum';

export class SessionDto {
  constructor(
    readonly id: string,
    readonly date: Date,
    readonly roomNumber: number,
    readonly timeSlot: TimeSlot,
  ) {}

  static mapTo(session: Session) {
    return new SessionDto(
      session.getId(),
      session.getDate(),
      session.getRoomNumber(),
      session.getTimeSlot(),
    );
  }
}
