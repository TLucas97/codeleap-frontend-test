import { createSlice } from '@reduxjs/toolkit';

export interface ScrollState {
  hasReachedBottom: boolean;
}

const initialState: ScrollState = {
  hasReachedBottom: false,
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    reachedBottom: (state) => {
      state.hasReachedBottom = true;
    },
    reset: (state) => {
      state.hasReachedBottom = false;
    }
  },
});

export const { reachedBottom } = scrollSlice.actions;
export const scrollReducer = scrollSlice.reducer;
