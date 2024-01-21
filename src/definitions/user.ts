export interface IUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IUserState {
  user: IUser;
  loading: boolean;
}

export interface ICreateUser {
  name: string;
  email: string;
  phoneNumber: string;
}
