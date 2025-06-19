import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogsData } from '../../types/blogs';
import { addBlog, fetchBlogs } from './blogsThunk';
import { attachSimpleThunk } from '../../untils/redux/attachSimpleThunk';

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
    attachSimpleThunk<PostsState, BlogsData[]>(
      builder,
      fetchBlogs,
      (state, action) => {
        state.blogs = action.payload;
      }
    );
    ///ADD BLOGS
    attachSimpleThunk<PostsState, any, Omit<BlogsData, 'id'>>(
      builder,
      addBlog,
      (state, action) => {
        state.blogs = action.payload;
      }
    ); 
  },
});

export default postsSlice.reducer;
