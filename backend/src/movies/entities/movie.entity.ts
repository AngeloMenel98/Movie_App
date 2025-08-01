import { MovUser } from 'src/mov_user/entities/mov_user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  title: string;

  @Column({ type: 'varchar' })
  synopsis: string;

  @Column({ type: 'varchar' })
  coverImage: string;

  @OneToMany(() => MovUser, (movUser) => movUser.movie)
  reviews: MovUser[];
}
