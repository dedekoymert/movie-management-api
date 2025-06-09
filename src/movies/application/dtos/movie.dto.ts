import { Movie } from 'src/movies/domain/movie.entity';
import { SessionDto } from './session.dto';

export class MovieDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly ageRestriction: number,
    readonly sessions: SessionDto[],
  ) {}

  static mapTo(movie: Movie): MovieDto {
    return new MovieDto(
      movie.getId(),
      movie.getName(),
      movie.getAgeRestriction(),
      movie.getSessions().map((session) => SessionDto.mapTo(session)),
    );
  }

  static mapToList(movies: Movie[]): MovieDto[] {
    return movies.map((movie) => this.mapTo(movie));
  }
}
