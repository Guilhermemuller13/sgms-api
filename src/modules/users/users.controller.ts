import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') userId: number,
    @Body(ValidationPipe)
    data: UpdateUserDTO,
  ) {
    return this.userService.updateUser(+userId, data);
  }

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body(ValidationPipe)
    data: CreateUserDTO,
  ) {
    return this.userService.createUser(data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}


