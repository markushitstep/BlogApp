import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchBlogs } from '../features/blogs/blogsThunk';
import { BlogComments } from './BlogComments';
import { BlogsData } from '../types/blogs';
import { ButtonPrimary } from './UI/buttons';

export const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.blogs);
  const [filteredBlog, setFilteredBlog] = useState<BlogsData>();

  useEffect(() => {
    dispatch(fetchBlogs())
      .unwrap()
      .then((response: BlogsData[]) => {
        const filteredBlog = response.find(blogs => blogs.id === id);
        setFilteredBlog(filteredBlog)
      })
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!filteredBlog) return <p>Blog not found. <button onClick={() => navigate(-1)} className="underline text-blue-600">Back</button></p>;

  return (
    <div className='flex flex-col items-center'>
      <div className="w-full xs:w-3/4 lg:w-2/4 p-6 box-border overflow-hidden">
        <h1 className="text-3xl font-bold mb-6">{filteredBlog.title}</h1>
        <p className="text-gray-700 whitespace-pre-wrap break-words">{filteredBlog.text}</p>
        <ButtonPrimary 
          onClick={() => navigate(-1)}
          className='mt-5'
        >
          Back
        </ButtonPrimary>
      </div>
      <div className='w-full xs:w-3/4 lg:w-2/4'>
        <BlogComments blogId={id as string} />
      </div>
    </div>
  );
};
