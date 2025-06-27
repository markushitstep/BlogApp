import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { BlogsData } from '../../types/blogs';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlog', async () => {
  const blogsCol = collection(db, 'blogs');
  const blogsData = await getDocs(query(blogsCol, orderBy('createdAt', 'asc')));

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

export const addBlog = createAsyncThunk<BlogsData, Omit<BlogsData, 'id'>>(
  'blogs/add',
  async (blog: Omit<BlogsData, 'id'>) => {
    const blogCol = collection(db, 'blogs');
    const blogData = await addDoc(blogCol, { ...blog, createdAt: serverTimestamp() });
    return { id: blogData.id, ...blog, createdAt: new Date() };
  },
);

export interface IUpdateTitleProps {
  blogId: string;
  title: string;
}

export const updateTitleBlog = createAsyncThunk(
  'blogs/updateTitle',
  async ({ blogId, title }: IUpdateTitleProps) => {
    const blogRef = doc(db, 'blogs', blogId);
    await updateDoc(blogRef, { title, updatedAt: serverTimestamp() });
    return { blogId, title };
  },
);

export interface IUpdateTextProps {
  blogId: string;
  text: string;
}

export const updateTextBlog = createAsyncThunk(
  'blogs/updateText',
  async ({ blogId, text }: IUpdateTextProps) => {
    const blogRef = doc(db, 'blogs', blogId);
    await updateDoc(blogRef, { text, updatedAt: serverTimestamp() });
    return { blogId, text};
  },
);

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (blogId: string) => {
    const blogCol = doc(db, 'blogs', blogId);
    await deleteDoc(blogCol);
    return blogId;
  },
);
