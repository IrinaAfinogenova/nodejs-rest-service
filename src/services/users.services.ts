import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import type { UserDto, UserUpdateDto } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: { [id: string]: UserDto } = {};

  create({ login, password }: Pick<UserDto, 'login' | 'password'>): UserDto {
    const id = uuidv4(); // Проверка на корректность логина и пароля
    this.users[id] = {
      id,
      login,
      password,
      version: 1,
      createdAt: new Date().valueOf(),
      updatedAt: new Date().valueOf(),
    };

    return this.users[id];
  }

  getUser(id: string): UserDto {
    return this.users[id];
  }

  updateUser(id: string, info: UserUpdateDto): UserDto {
    return {
      ...this.users[id],
      ...info,
    };
  }

  findAll(): UserDto[] {
    return Object.values(this.users);
  }
}
