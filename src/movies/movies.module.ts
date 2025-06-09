import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesController } from './interface/movies.controller';
import { MoviesService } from './application/movies.service';
import { MovieSchema } from './infrastracture/schemas/movie.schema';
import { MoviesRepositoryImpl } from './infrastracture/movies.repository';
import { SessionSchema } from './infrastracture/schemas/session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movies', schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: 'Sessions', schema: SessionSchema }]),
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    {
      provide: 'MoviesRepository',
      useClass: MoviesRepositoryImpl,
    },
  ],
})
export class MoviesModule {}
