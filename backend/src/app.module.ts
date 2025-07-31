import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './database/database.module';
import { MoviesModule } from './movies/movies.module';
import { MovUserModule } from './mov_user/mov_user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    DataBaseModule,
    UsersModule,
    MoviesModule,
    MovUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
