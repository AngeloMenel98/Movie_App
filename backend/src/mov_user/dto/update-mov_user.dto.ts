import { PartialType } from '@nestjs/mapped-types';
import { CreateMovUserDto } from './create-mov_user.dto';

export class UpdateMovUserDto extends PartialType(CreateMovUserDto) {}
