import { TimeSlot } from './time-slot.enum';

export class Session {
  constructor(
    private readonly id: string,
    private readonly movieId: string,
    private readonly date: Date,
    private readonly roomNumber: number,
    private readonly timeSlot: TimeSlot,
  ) {}

  getId(): string {
    return this.id;
  }

  getMovieId(): string {
    return this.movieId;
  }

  getDate(): Date {
    return this.date;
  }

  getRoomNumber(): number {
    return this.roomNumber;
  }

  getTimeSlot(): TimeSlot {
    return this.timeSlot;
  }
}
