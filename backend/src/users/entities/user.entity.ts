import { compareHash, hashValue } from 'src/helpers/bCrypt.helper';
import { MovUser } from 'src/mov_user/entities/mov_user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  loginAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => MovUser, (movUser) => movUser.user)
  reviews: MovUser[];

  async hashPassword(password: string): Promise<string> {
    return (this.password = await hashValue(password));
  }

  compareHashPass(password: string) {
    return compareHash(password, this.password);
  }
}
