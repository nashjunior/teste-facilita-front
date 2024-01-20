import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ICreateUser, type IUser } from '../definitions';
import { apiBase } from '../config/api-base';

interface IRequest {
  user: ICreateUser;
}

export const signUp = createAsyncThunk(
  'users/signup',
  async (client: IRequest): Promise<IUser> => {
    const user = {
      name: client.user.name,
      email: client.user.email,
      cpf: client.user.cpf,
      place: client.user.address,
      number: client.user.number,
      city: client.user.city,
      state: client.user.state,
    };

    await apiBase.post('companies/create', user);

    return { name: client.user.name, isLoggedIn: true };
  }
);

export const signIn = createAsyncThunk(
  'users/signin',
  async (): Promise<IUser> => {
    return { name: '', isLoggedIn: false };
  }
);
