import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieRepo extends Repository<Movie> {
  constructor(
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    private dataSource: DataSource,
  ) {
    super(movieRepo.target, movieRepo.manager);
  }

  async createMovie(movie: Movie) {
    return this.dataSource.manager.transaction(async (manager) => {
      return manager.save(movie);
    });
  }

  async updateUser(movie: Movie) {
    return this.dataSource.manager.transaction(async (manager) => {
      return manager.save(movie);
    });
  }
}
