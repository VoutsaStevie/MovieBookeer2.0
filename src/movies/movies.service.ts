
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
//import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  private readonly TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  private readonly TMDB_API_KEY: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.TMDB_API_KEY = this.configService.get<string>('TMDB_API_KEY', '');

  }

  private getApiUrl(endpoint: string, params: Record<string, any> = {}): string {
    const url = new URL(`${this.TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', this.TMDB_API_KEY);
    url.searchParams.append('language', 'fr-FR');

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.append(key, params[key]);
      }
    });

    return url.toString();
  }

  async getNowPlaying(page = 1) {
    const url = this.getApiUrl('/movie/now_playing', { page });
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async searchMovie(query: string, page = 1) {
    const url = this.getApiUrl('/search/movie', { query, page });
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getMovieDetails(movieId: number) {
    const url = this.getApiUrl(`/movie/${movieId}`);
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getGenres() {
    const url = this.getApiUrl('/genre/movie/list');
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getMovies(page: number = 1, query: string = '', sort: string = 'popularity.desc') {
    const url = this.getApiUrl('/discover/movie', { page, query, sort_by: sort });
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }


}
