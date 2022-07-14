import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: { [id: string]: User } = {};

  create({ login, password }: any): User {
    const id = uuidv4();
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

  getUser(id: string): User {
    return this.users[id];
  }

  findAll(): User[] {
    return Object.values(this.users);
  }
}
