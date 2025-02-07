
import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('now-playing')
  async getNowPlaying(@Query('page') page: number = 1) {
    return this.moviesService.getNowPlaying(page);
  }

  @Get('search')
  async searchMovie(@Query('query') query: string, @Query('page') page: number = 1) {
    return this.moviesService.searchMovie(query, page);
  }

  @Get(':id')
  async getMovieDetails(@Param('id') id: number) {
    return this.moviesService.getMovieDetails(id);
  }

  @Get('genres')
  async getGenres() {
    return this.moviesService.getGenres();
  }

  @Get()
    async getMovies(@Query('page') page: number = 1,
                        @Query('search') search: string = '',
                        @Query('sort') sort: string = 'popularity.desc') {
      return this.moviesService.getMovies(page, search, sort);
    }
}
