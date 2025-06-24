import { createSlice } from "@reduxjs/toolkit";
import { addComment, deleteComment, fetchCommentsByBlogId } from "./commentsThunk";
import { CommentData } from "../../types/comment";

interface CommentsState {
  comments: CommentData[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByBlogId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByBlogId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByBlogId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })

      ///ADD COMMENT
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const comment = action.payload;
        if (!state.comments) {
          state.comments = [];
        }
        state.comments.push(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })

      ///DELETE COMMENT
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((comment) => comment.id !== action.payload );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
  },
});

export default commentsSlice.reducer;
