import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovUserService } from './mov_user.service';
import { CreateMovUserDto } from './dto/create-mov_user.dto';
import { UpdateMovUserDto } from './dto/update-mov_user.dto';

@Controller('mov-user')
export class MovUserController {
  constructor(private readonly movUserService: MovUserService) {}

  @Post()
  create(@Body() createMovUserDto: CreateMovUserDto) {
    return this.movUserService.create(createMovUserDto);
  }

  @Get()
  findAll() {
    return this.movUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovUserDto: UpdateMovUserDto) {
    return this.movUserService.update(+id, updateMovUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movUserService.remove(+id);
  }
}
