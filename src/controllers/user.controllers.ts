import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from '../services/users.services';
import type { UserDto, UserUpdateDto } from '../interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() userInfo): UserDto {
    return this.userService.create(userInfo);
  }

  @Get()
  findAll(): UserDto[] {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUser(@Param('id') id: string): UserDto {
    return this.userService.getUser(id);
  }

  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() userInfo: UserUpdateDto,
  ): UserDto {
    return this.userService.updateUser(id, userInfo);
  }
}
