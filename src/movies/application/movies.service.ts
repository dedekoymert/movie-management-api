import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from '../domain/movies.repository.interface';
import { AddMovieDto } from './dtos/add-movie.dto';
import { MovieDto } from './dtos/movie.dto';
import { Movie } from '../domain/movie.entity';
import { Session } from '../domain/session.entity';
import { ModifyMovieDto } from './dtos/modify-movie.dto';
import { AddSessionDto } from './dtos/add-session.dto';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('MoviesRepository')
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async addMovie(addMovieDto: AddMovieDto): Promise<MovieDto> {
    const movie = new Movie('', addMovieDto.name, addMovieDto.ageRestriction);
    const createdMovie = await this.moviesRepository.create(movie);
    return MovieDto.mapTo(createdMovie);
  }

  async addMovieSession(
    movieId: string,
    addSessionDto: AddSessionDto,
  ): Promise<MovieDto> {
    const session = new Session(
      '',
      movieId,
      addSessionDto.date,
      addSessionDto.roomNumber,
      addSessionDto.timeSlot,
    );

    const updatedMovie = await this.moviesRepository.createSession(session);
    return MovieDto.mapTo(updatedMovie);
  }

  async deleteMovie(id: string) {
    return await this.moviesRepository.delete(id);
  }

  async listMovies(): Promise<MovieDto[]> {
    return MovieDto.mapToList(await this.moviesRepository.findAll());
  }

  async modifyMovie(
    id: string,
    modifyMovieDto: ModifyMovieDto,
  ): Promise<MovieDto> {
    const movie = await this.moviesRepository.findById(id);

    if (movie == null) {
      throw new NotFoundException(`Movie with id: ${id} not found.`);
    }

    movie.setName(modifyMovieDto.name);
    movie.setAgeRestriction(modifyMovieDto.ageRestriction);

    const updatedMovie = await this.moviesRepository.update(movie);
    if (updatedMovie == null) {
      throw new NotFoundException(`Movie with id: ${id} not found.`);
    }
    return MovieDto.mapTo(updatedMovie);
  }
}
