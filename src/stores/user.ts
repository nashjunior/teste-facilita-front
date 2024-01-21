import { createSlice } from '@reduxjs/toolkit';
import { type IUserState } from '../definitions';
import { createClient } from '../actions';

const initialState: IUserState = {
  user: undefined as any,
  loading: false,
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createClient.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { reducer: usersReducer } = usersSlice;
