export interface UserDto { // TODO уюбрать DTO
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type UserUpdateDto = {
  oldPassword: string;
  newPassword: string;
};
