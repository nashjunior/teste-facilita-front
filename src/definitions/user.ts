export enum UserActions {
  SIGNIN = `SIGN-IN`,
  SIGNUP = 'SIGN-UP',
}

export interface IUser {
  name: string;
  isLoggedIn: boolean;
}

export interface IUserState {
  loading: boolean;
  user: IUser;
  error?: string;
  toastMessage?: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  cpf: string | null;
  address: string;
  number: string | null;
  city: string;
  state: string;
}
