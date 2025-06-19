import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { CommentData } from "../../types/comment";
import { db } from "../../firebaseConfig";

export const fetchCommentsByBlogId = createAsyncThunk(
  'comments/fetchByBlogId',
  async (blogId: string) => {
    const commentsCol = collection(db, 'Comments');
    const q = query(commentsCol, where('blogId', '==', blogId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const comments: CommentData[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<CommentData, 'id'>),
    }));
    console.log('dsadsada')
    return { blogId, comments };
  }
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<CommentData, 'id' | 'createdAt'>) => {
    const commentsCol = collection(db, 'Comments');
    const docRef = await addDoc(commentsCol, { ...comment, createdAt: serverTimestamp() });
    return { id: docRef.id, ...comment, createdAt: new Date() };
  }
);
