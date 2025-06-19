import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchBlogs } from '../features/blogs/blogsThunk';
import { BlogComments } from './BlogComments';
import { addComment, fetchCommentsByBlogId } from '../features/comments/commentsThunk';

export const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { blogs, loading } = useAppSelector(state => state.blogs);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs.length]);

  useEffect(() => {
    if(id) {
      dispatch(fetchCommentsByBlogId(id))
    }
  }, [id, dispatch]);

  const blog = blogs.find(b => b.id === id);

  if (loading) return <p>Загрузка...</p>;
  if (!blog) return <p>Блог не найден. <button onClick={() => navigate(-1)} className="underline text-blue-600">Вернуться назад</button></p>;

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
        <p className="text-gray-700 whitespace-pre-wrap">{blog.content}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Назад к списку
        </button>
      </div>
      <div>
        <BlogComments blogId={blog.id} />
      </div>
    </>
  );
};
