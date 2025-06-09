import { Injectable } from '@nestjs/common';
import { MoviesRepository } from '../domain/movies.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovie } from './schemas/movie.schema';
import { Movie } from '../domain/movie.entity';
import { Session } from '../domain/session.entity';
import { ISession } from './schemas/session.schema';

@Injectable()
export class MoviesRepositoryImpl implements MoviesRepository {
  constructor(
    @InjectModel('Movies') private movieModel: Model<IMovie>,
    @InjectModel('Sessions') private sessionModel: Model<ISession>,
  ) {}

  async create(movie: Movie): Promise<Movie> {
    const movieDoc = new this.movieModel({
      name: movie.getName(),
      ageRestriction: movie.getAgeRestriction(),
    });
    await movieDoc.save();
    console.log(movieDoc);
    return new Movie(movieDoc._id, movieDoc.name, movieDoc.ageRestriction);
    // return this.mapToMovieEntity(await movieDoc.save());
  }

  async createSession(session: Session): Promise<Movie> {
    const sessionDoc = new this.sessionModel({
      movieId: session.getMovieId(),
      date: session.getDate(),
      roomNumber: session.getRoomNumber(),
      timeSlot: session.getTimeSlot(),
    });

    const createdSession = await sessionDoc.save();
    const updatedMovie = await this.movieModel.findOneAndUpdate(
      { _id: session.getMovieId() },
      { $push: { sessions: createdSession._id } },
      { new: true },
    );

    console.log(updatedMovie);
    return new Movie('', '', 1);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.movieModel.findByIdAndDelete(id);
    return result !== null;
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieModel
      .find()
      .populate<{ sessions: ISession[] }>('sessions');
    console.log(movies);
    movies.map((m) => m.sessions.map((s) => console.log(s)));
    console.log(movies);
    return [];
    // return movies.map((m) => this.mapToMovieEntity(m));
  }

  async findById(id: string): Promise<Movie | null> {
    const movie = await this.movieModel.findById(id);
    return null;
    // return movie ? this.mapToMovieEntity(movie) : null;
  }

  async update(movie: Movie): Promise<Movie | null> {
    const updatedMovie = await this.movieModel.findByIdAndUpdate(
      movie.getId(),
      {
        name: movie.getName(),
        ageRestriction: movie.getAgeRestriction(),
      },
      { new: true },
    );
    return null;
    // return updatedMovie ? this.mapToMovieEntity(updatedMovie) : null;
  }

  // private mapToMovieEntity(movieDoc: IPopulatedMovie): Movie {
  //   return new Movie(
  //     movieDoc._id,
  //     movieDoc.name,
  //     movieDoc.ageRestriction,
  //     movieDoc.sessions?.map(
  //       (session) =>
  //         new Session(
  //           session._id,
  //           session.date,
  //           session.roomNumber,
  //           session.timeSlot,
  //         ),
  //     ),
  //   );
  // }
}
