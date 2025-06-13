import { createSlice } from '@reduxjs/toolkit';
import { BlogsData } from '../../types/blogs';
import { addBlog, fetchBlogs } from './blogsThunk';

interface PostsState {
  blogs: BlogsData[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  blogs: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///FETCH BLOGS
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })

      ///ADD BLOGS
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export default postsSlice.reducer;
