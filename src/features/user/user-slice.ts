import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: '',
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;