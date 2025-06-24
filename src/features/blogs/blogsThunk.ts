import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { BlogsData } from '../../types/blogs';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlog', async () => {
  const postsCol = collection(db, 'blogs');
  const blogsData = await getDocs(postsCol);

   const blogsWithComments = await Promise.all(
    blogsData.docs.map(async (doc) => {
      const blog = {
        id: doc.id,
        ...doc.data(),
      };

      const commentsCol = collection(db, 'blogs', doc.id, 'comments');
      const commentsSnap = await getDocs(query(commentsCol, orderBy('createdAt', 'asc')));
      const comments = commentsSnap.docs.map(comment => ({
        id: comment.id,
        ...comment.data(),
      }));

      return {
        ...blog,
        comments,
      };
    })
  );

  return blogsWithComments as BlogsData[];
});

export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async (blog: Omit<BlogsData, 'id'>) => {
    const blogCol = collection(db, 'blogs');
    const blogData = await addDoc(blogCol, blog);
    return { id: blogData.id, ...blog };
  },
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId: string) => {
    const blogCol = doc(db, 'blogs', blogId);
    await deleteDoc(blogCol);
    return blogId;
  },
);
