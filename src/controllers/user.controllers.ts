import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from '../services/users.services';
import { User } from '../interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() userInfo): User {
    return this.userService.create(userInfo);
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUser(@Param('id') id: string): User {
    return this.userService.getUser(id);
  }
}
