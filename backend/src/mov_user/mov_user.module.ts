import { Module } from '@nestjs/common';
import { MovUserService } from './mov_user.service';
import { MovUserController } from './mov_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovUser } from './entities/mov_user.entity';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';
import { MovUserRepo } from './repository/mov_user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovUser]), UsersModule, MoviesModule],
  controllers: [MovUserController],
  providers: [MovUserService, MovUserRepo],
})
export class MovUserModule {}
