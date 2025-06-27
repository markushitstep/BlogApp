import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { addBlog } from '../features/blogs/blogsThunk';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from './UI/buttons';


const blogSchema = z.object({
  title: z.string().min(3, 'Минимум 3 символа'),
  text: z.string().min(10, 'Минимум 10 символов'),
});

type BlogFormData = z.infer<typeof blogSchema>;

export const BlogForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.blogs);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = (data: BlogFormData) => {
    dispatch(addBlog(data)).then((res) => {
      if (addBlog.fulfilled.match(res)) {
        reset();
        navigate('/blogs');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 mt-6 bg-white rounded shadow">
      <h2 className="flex justify-center text-2xl font-semibold mb-4">Create blog</h2>

      <label className="block mb-1 font-medium" htmlFor="title">Title</label>
      <input
        {...register('title')}
        id="title"
        className={`w-full py-2 px-4 border border-gray-400 rounded-2xl ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

      <label className="block mt-4 mb-1 font-medium" htmlFor="content">Content</label>
      <textarea
        {...register('text')}
        id="content"
        rows={6}
        className={`w-full py-2 px-4 border border-gray-400 rounded-2xl ${errors.text ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.text && <p className="text-red-600 text-sm">{errors.text.message}</p>}

      <ButtonPrimary 
        type='submit'
        disabled={loading} 
        className='mt-5'
      >
        {loading ? 'Saving...' : 'Create'}
      </ButtonPrimary>

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
};
