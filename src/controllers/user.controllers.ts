import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseUUIDPipe,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.services';
import type { UserDto } from '../interfaces/user.interface';
import { CreateUserDto, UpdatePasswordDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserDto {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): UserDto[] {
    return this.userService.findAll();
  }

  @Get('/:id')
  async getUser( // TODO а async прям нужен?
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserDto> {
    const user = this.userService.getUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Put('/:id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() userInfo: UpdatePasswordDto,
  ): Promise<UserDto> {
    const user = this.userService.getUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userService.updatePassword(id, userInfo);
  }

  @Delete('/:id')
  deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): string {
    return this.userService.deleteUser(id);
  }
}
