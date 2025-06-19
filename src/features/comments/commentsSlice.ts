import { createSlice } from "@reduxjs/toolkit";
import { addComment, fetchCommentsByBlogId } from "./commentsThunk";
import { CommentData } from "../../types/comment";

interface CommentsState {
  commentsByBlogId: Record<string, CommentData[]>;
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  commentsByBlogId: {},
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
        const { blogId, comments } = action.payload;
        state.commentsByBlogId[blogId] = comments;
      })
      .addCase(fetchCommentsByBlogId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })

      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const comment = action.payload;
        if (!state.commentsByBlogId[comment.blogId]) {
          state.commentsByBlogId[comment.blogId] = [];
        }
        state.commentsByBlogId[comment.blogId].push(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export default commentsSlice.reducer;
