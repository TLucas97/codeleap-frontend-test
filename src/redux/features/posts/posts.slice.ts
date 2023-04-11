import { createSlice } from '@reduxjs/toolkit';

export interface PostState {
  hasFetchedPosts: boolean;
  isFetchingByUsername: boolean;
  hasCreatedPost: boolean;
}

const initialState: PostState = {
  hasFetchedPosts: false,
  isFetchingByUsername: false,
  hasCreatedPost: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    hasFetched: (state) => {
      state.hasFetchedPosts = true;
    },
    reset: (state) => {
      state.hasFetchedPosts = false;
    },
    fetchingByUsername: (state) => {
      state.isFetchingByUsername = !state.isFetchingByUsername;
    },
    clearFetchingByUsername: (state) => {
      state.isFetchingByUsername = false;
    },
    createdPost: (state) => {
      state.hasCreatedPost = !state.hasCreatedPost;
    },
  },
});

export const { hasFetched, reset, fetchingByUsername, clearFetchingByUsername, createdPost } = postSlice.actions;
export const postReducer = postSlice.reducer;
