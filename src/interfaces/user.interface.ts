export interface UserDto {
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
