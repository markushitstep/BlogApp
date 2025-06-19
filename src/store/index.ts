import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../features/blogs/blogsSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    comments: commentsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
