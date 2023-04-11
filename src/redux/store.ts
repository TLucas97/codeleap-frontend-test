import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/user/user-slice';
import { scrollReducer } from './features/scroll/scroll-slice';
import { postReducer } from './features/posts/posts.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    scroll: scrollReducer,
    post: postReducer,
  },
});
