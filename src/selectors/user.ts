import { createSelector } from '@reduxjs/toolkit';
import { type IUserState } from '../definitions';

const selectUsersState = (state: { user: IUserState }): IUserState =>
  state.user;

export const selectUserRequestStatus = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectUserSignInError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const selectUser = createSelector(
  selectUsersState,
  (state) => state.user
);
