import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from '../application/movies.service';
import { AddMovieDto } from '../application/dtos/add-movie.dto';
import { ModifyMovieDto } from '../application/dtos/modify-movie.dto';
import { AddSessionDto } from '../application/dtos/add-session.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  listMovies() {
    return this.moviesService.listMovies();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  addMovie(@Body() addMovieDto: AddMovieDto) {
    return this.moviesService.addMovie(addMovieDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  modifyMovie(@Param('id') id: string, @Body() modifyMovieDto: ModifyMovieDto) {
    return this.moviesService.modifyMovie(id, modifyMovieDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  addMovieSession(
    @Param('id') id: string,
    @Body() addSessionDto: AddSessionDto,
  ) {
    return this.moviesService.addMovieSession(id, addSessionDto);
  }
}
