import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { CommentData } from "../../types/comment";
import { db } from "../../firebaseConfig";

export const fetchCommentsByBlogId = createAsyncThunk(
  'comments/fetchByBlogId',
  async (blogId: string) => {
    const commentsCol = collection(db, 'blogs', blogId, 'comments');
      const commentsSnap = await getDocs(query(commentsCol, orderBy('createdAt', 'asc')));
      const comments = commentsSnap.docs.map(comment => ({
        id: comment.id,
        ...(comment.data() as Omit<CommentData, 'id'>),
      }));
      return comments;
  }
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<CommentData, 'id' | 'createdAt'>) => {
    const commentsCol = collection(db, 'blogs', comment.blogId, 'comments');
    const docRef = await addDoc(commentsCol, { ...comment, createdAt: serverTimestamp() });
    return { id: docRef.id, ...comment, createdAt: new Date() };
  }
);

interface IDeleteProps {
  blogId: string;
  commentId: string;
}

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ blogId, commentId }: IDeleteProps) => {
    const commentsCol = doc(db, 'blogs', blogId, 'comments', commentId);
    await deleteDoc(commentsCol);
    return commentId;
  }
);
