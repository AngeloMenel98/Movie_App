import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovUser } from '../entities/mov_user.entity';

@Injectable()
export class MovUserRepo extends Repository<MovUser> {
  constructor(
    @InjectRepository(MovUser) private movUserRepo: Repository<MovUser>,
    private dataSource: DataSource,
  ) {
    super(movUserRepo.target, movUserRepo.manager);
  }

  async createMovUser(movUser: MovUser) {
    return this.dataSource.manager.transaction(async (manager) => {
      return manager.save(movUser);
    });
  }
}
