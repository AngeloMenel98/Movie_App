import { Module } from '@nestjs/common';
import { MovUserService } from './mov_user.service';
import { MovUserController } from './mov_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovUser } from './entities/mov_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovUser])],
  controllers: [MovUserController],
  providers: [MovUserService],
})
export class MovUserModule {}
