import { Injectable } from '@nestjs/common';
import { CreateMovUserDto } from './dto/create-mov_user.dto';
import { UpdateMovUserDto } from './dto/update-mov_user.dto';

@Injectable()
export class MovUserService {
  create(createMovUserDto: CreateMovUserDto) {
    return 'This action adds a new movUser';
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
