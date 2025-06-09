import { Session } from './session.entity';

export class Movie {
  constructor(
    private readonly id: string,
    private name: string,
    private ageRestriction: number,
    private sessions: Session[] = [],
  ) {}

  setName(name: string): void {
    if (name) {
      this.name = name;
    }
  }

  setAgeRestriction(ageRestriction: number): void {
    if (ageRestriction > 0) {
      this.ageRestriction = ageRestriction;
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAgeRestriction(): number {
    return this.ageRestriction;
  }

  getSessions(): Session[] {
    return this.sessions;
  }
}
