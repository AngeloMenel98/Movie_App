import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepo } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepo) {}

  async create(userDTO: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: userDTO.email }, { username: userDTO.username }],
    });

    if (existingUser) {
      if (existingUser.email === userDTO.email) {
        throw new ConflictException('Email is already taken');
      }

      if (existingUser.username === userDTO.username) {
        throw new ConflictException('Username is already taken');
      }
    }

    const user = new User();
    user.username = userDTO.username;
    user.email = userDTO.email;
    await user.hashPassword(userDTO.password);

    return this.userRepository.createUser(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with Id #${id} not Found`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateLoginAt(id: string, userDTO: UpdateUserDto) {
    const user = await this.findOne(id);

    const newUser = await this.userRepository.updateUser(
      Object.assign(user, userDTO),
    );

    return {
      id: newUser.id,
      username: newUser.username,
    };
  }

  async findByUsernameOrEmail(username, email) {
    const user = await this.userRepository.findOne({
      where: [{ username, email }],
    });

    if (!user) {
      return null;
    }

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
