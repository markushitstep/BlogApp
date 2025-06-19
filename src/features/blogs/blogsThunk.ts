import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { BlogsData } from '../../types/blogs';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlog', async () => {
  const postsCol = collection(db, 'Blogs');
  const blogsData = await getDocs(postsCol);
  return blogsData.docs.map((data) => ({
    id: data.id,
    ...data.data(),
  })) as BlogsData[];
});

export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async (blog: Omit<BlogsData, 'id'>) => {
    const postsCol = collection(db, 'Blogs');
    const blogData = await addDoc(postsCol, blog);
    return { id: blogData.id, ...blog };
  },
);
