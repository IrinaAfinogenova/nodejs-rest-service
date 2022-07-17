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
    const id = uuidv4();
    this.users[id] = {
      id,
      login,
      password,
      version: 1,
      createdAt: new Date().valueOf(),
      updatedAt: new Date().valueOf(),
    };

    return this.getUser(id);
  }

  getUser(id: string): UserDto {
    const user = this.users[id];

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return Object.keys(user).reduce((object, key) => {
      if (key !== 'password') {
        object[key] = user[key];
      }

      return object;
    }, {} as UserDto);
  }

  updatePassword(id: string, info: UserUpdateDto): UserDto {
    const currentPassword = this.users[id].password;

    // Вынести все проверки сюда

    if (currentPassword !== info.oldPassword) {
      throw new ForbiddenException('old password wrong');
    }

    this.users[id].password = info.newPassword;
    this.users[id].version = ++this.users[id].version;
    this.users[id].updatedAt = new Date().valueOf();

    return this.getUser(id);
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
