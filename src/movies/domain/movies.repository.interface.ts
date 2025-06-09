import { Movie } from './movie.entity';
import { Session } from './session.entity';

export interface MoviesRepository {
  create(movie: Movie): Promise<Movie>;
  createSession(session: Session): Promise<Movie>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Movie[]>;
  findById(id: string): Promise<Movie | null>;
  update(movie: Movie): Promise<Movie | null>;
}
