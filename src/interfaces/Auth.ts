export interface ILogin {
  email: string;
  password: string;
}

export interface IUserLogin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  token: string;
  permissions: string[];
}
