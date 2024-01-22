import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ICreateUser, type IUser } from '../definitions';
import { apiBase } from '../config/api-base';
import { type ICreateCoordinate } from '../definitions/coordinate';

export const createClient = createAsyncThunk(
  'users/signup',
  async (client: ICreateUser): Promise<IUser> => {
    const { data } = await apiBase.post<IUser>('clients', client);

    return data;
  }
);

export const updateClient = createAsyncThunk(
  'users/update',
  async ({
    id,
    ...formContent
  }: ICreateUser & { id: string }): Promise<IUser> => {
    const { data } = await apiBase.put<IUser & ICreateCoordinate>(
      `clients/${id}`,
      formContent
    );

    return data;
  }
);

export const deleteClient = createAsyncThunk(
  'users/delete',
  async (id: string): Promise<void> => {
    await apiBase.delete<IUser>(`clients/${id}`);
  }
);
