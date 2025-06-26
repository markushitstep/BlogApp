import { createSlice } from '@reduxjs/toolkit';
import { BlogsData } from '../../types/blogs';
import { addBlog, deleteBlog, fetchBlogs, IUpdateTitleProps, IUpdateTextProps, updateTitleBlog, updateTextBlog } from './blogsThunk';
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
    ///UPDATE TITLE BLOG
    attachSimpleThunk<PostsState,{ blogId: string, title: string}, IUpdateTitleProps>(
      builder,
      updateTitleBlog,
      (state, action) => {
        const { blogId, title } = action.payload;
        state.blogs = state.blogs.map(blog => blog.id === blogId ? {...blog, title } : blog)
      }
    ); 
    ///UPDATE TEXT BLOG
    attachSimpleThunk<PostsState,{ blogId: string, text: string}, IUpdateTextProps>(
      builder,
      updateTextBlog,
      (state, action) => {
        const { blogId, text } = action.payload;
        state.blogs = state.blogs.map(blog => blog.id === blogId ? {...blog, text } : blog)
      }
    ); 
    ///DELETE BLOGS
    attachSimpleThunk<PostsState, string, string>(
      builder,
      deleteBlog,
      (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);

      }
    ); 
  },
});

export default postsSlice.reducer;
