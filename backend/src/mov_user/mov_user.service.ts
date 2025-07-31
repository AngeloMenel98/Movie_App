import { Injectable } from '@nestjs/common';
import { CreateMovUserDto } from './dto/create-mov_user.dto';
import { UpdateMovUserDto } from './dto/update-mov_user.dto';
import { MovUser } from './entities/mov_user.entity';
import { MovUserRepo } from './repository/mov_user.repository';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class MovUserService {
  constructor(
    private movUserRepo: MovUserRepo,
    private userService: UsersService,
    private movieService: MoviesService,
  ) {}

  async create(movUserDTO: CreateMovUserDto) {
    const user = await this.userService.findOne(movUserDTO.userId);
    const movie = await this.movieService.findOne(movUserDTO.movieId);

    const movUser = new MovUser();
    movUser.user = user;
    movUser.movie = movie;
    movUser.comment = movUserDTO.comment;
    movUser.rating = movUserDTO.rating;

    return this.movUserRepo.createMovUser(movUser);
  }

  findAll() {
    return `This action returns all movUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movUser`;
  }

  update(id: number, updateMovUserDto: UpdateMovUserDto) {
    return `This action updates a #${id} movUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} movUser`;
  }
}
