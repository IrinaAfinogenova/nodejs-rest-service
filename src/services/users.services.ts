import { v4 as uuidv4 } from 'uuid';
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import type { UserDto, UserUpdateDto } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: { [id: string]: UserDto } = {};

  create({ login, password }: Pick<UserDto, 'login' | 'password'>): UserDto {
    const id = uuidv4(); // Проверка на корректность логина и пароля (Проверь)
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

  async getUser(id: string): Promise<UserDto> {
    const user = this.users[id];

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  updatePassword(id: string, info: UserUpdateDto): UserDto {
    const currentPassword = this.users[id].password;

    // Вынести все проверки сюда

    if (currentPassword !== info.oldPassword) { // И еще проверка что старый пароль не равен новому
      throw new ForbiddenException('old password wrong');
    }

    this.users[id].password = info.newPassword;

    return this.users[id];
  }

  findAll(): UserDto[] {
    return Object.values(this.users).filter(Boolean);
  }

  deleteUser(id): any {
    this.getUser(id);
    this.users[id] = null;

    return `user with id ${id} was deleted`;
  }
}
