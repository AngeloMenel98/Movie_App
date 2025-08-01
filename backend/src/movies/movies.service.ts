import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepo } from './repository/movie.repository';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private movieRepo: MovieRepo) {}

  async create(movieDTO: CreateMovieDto) {
    const existingMovie = await this.movieRepo.findOne({
      where: [{ title: movieDTO.title }],
    });

    if (existingMovie) {
      throw new ConflictException('Title is already taken');
    }

    const movie = new Movie();
    movie.title = movieDTO.title;
    movie.synopsis = movieDTO.synopsis;
    movie.coverImage = movieDTO.coverImage;

    return this.movieRepo.createMovie(movie);
  }

  async findAll() {
    const movies = await this.movieRepo.findAll();

    if (!movies) {
      throw new NotFoundException('There is any movies created');
    }

    return movies;
  }

  async findOne(id: string) {
    const movie = await this.movieRepo.findById(id);

    if (!movie) {
      throw new NotFoundException('Movie not Found');
    }

    return movie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
