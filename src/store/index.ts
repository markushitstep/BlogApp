import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../features/blogs/blogsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import { errorLoggerMiddleware } from '../untils/middleware/errorLoggerMiddleware';

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    comments: commentsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorLoggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
