import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './stores/user';

export const store = configureStore({
  reducer: { user: usersReducer },
});
