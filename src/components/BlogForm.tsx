import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { addBlog } from '../features/blogs/blogsThunk';
import { useForm } from 'react-hook-form';


const blogSchema = z.object({
  title: z.string().min(3, 'Минимум 3 символа'),
  content: z.string().min(10, 'Минимум 10 символов'),
});

type BlogFormData = z.infer<typeof blogSchema>;

export const BlogForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.blogs);

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
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 mt-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Создать блог</h2>

      <label className="block mb-1 font-medium" htmlFor="title">Заголовок</label>
      <input
        {...register('title')}
        id="title"
        className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

      <label className="block mt-4 mb-1 font-medium" htmlFor="content">Контент</label>
      <textarea
        {...register('content')}
        id="content"
        rows={6}
        className={`w-full p-2 border rounded ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.content && <p className="text-red-600 text-sm">{errors.content.message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Сохраняем...' : 'Создать'}
      </button>

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
};
