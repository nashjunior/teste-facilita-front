import { createSlice } from '@reduxjs/toolkit';
import { type IUserState } from '../definitions';
import { signUp } from '../actions';

const initialState: IUserState = {
  loading: false,
  user: {
    name: '',
    isLoggedIn: true,
  },
  room: undefined as any,
  toastMessage: undefined,
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.toastMessage = 'Sucessfully signed up';
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: usersReducer } = usersSlice;
