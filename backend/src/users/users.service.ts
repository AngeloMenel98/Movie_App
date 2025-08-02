import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, LoginUserDTO } from './dto/create-user.dto';
import { UserRepo } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepo,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(loginDTO: LoginUserDTO) {
    if (!loginDTO.username && !loginDTO.email) {
      throw new BadRequestException('Username or Email must be in the request');
    }

    const user = await this.findByUsernameOrEmail(
      loginDTO.username,
      loginDTO.email,
    );

    const isPasswordValid = await user.compareHashPass(loginDTO.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Password is not valid');
    }

    user.loginAt = new Date();
    await this.updateLoginAt(user.id, user);

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { id: user.id, username: user.username };

    const token = this.jwtService.sign(payload);

    return { token };
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

  async findByUsernameOrEmail(username: string, email: string) {
    const user = await this.userRepository.findOneBy([{ username }, { email }]);

    return user || null;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
