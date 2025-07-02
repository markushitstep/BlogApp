import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchBlogs, updateTextBlog, updateTitleBlog } from '../features/blogs/blogsThunk';
import { BlogComments } from './BlogComments';
import { BlogsData } from '../types/blogs';
import { ButtonImage, ButtonPrimary } from './UI/buttons';
import { useForm } from 'react-hook-form';
import { PencilIcon, BookmarkIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'react-toastify';

const blogTitleSchema = z.object({
  title: z.string().min(3, 'Минимум 3 символа'),
});
const blogTextSchema = z.object({
  text: z.string().min(10, 'Минимум 10 символов'),
});

type BlogTitleData = z.infer<typeof blogTitleSchema>;
type BlogTextData = z.infer<typeof blogTextSchema>;

export const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, blogs } = useAppSelector(state => state.blogs);
  const [filteredBlog, setFilteredBlog] = useState<BlogsData>();
  const [isEditMode, setIsEditMode] = useState({ title: false, text: false});

  const {
    register: registerTitle,
    handleSubmit: handleSubmitTitle,
    setValue: setValueTitle,
  } = useForm<BlogTitleData>({
    resolver: zodResolver(blogTitleSchema),
  });

  const {
    register: registerText,
    handleSubmit: handleSubmitText,
    setValue: setValueText,
  } = useForm<BlogTextData>({
    resolver: zodResolver(blogTextSchema),
  });
  
  const handleToggleEdit = (field: 'title' | 'text') => {
    setIsEditMode(prev => ({...prev, [field]: !prev[field]}));
    if(filteredBlog){
      field === 'title'
        ? setValueTitle(field, filteredBlog.title)
        : setValueText(field, filteredBlog.text)
    }
  }

  const handleFetchUpdate = async (field: 'title' | 'text', value: string) => {
    if(!id) return;

    if(field === 'title') {
      try {
        await dispatch(updateTitleBlog({ blogId: id, title: value })).unwrap();
        toast.success('Title was updated');
        handleToggleEdit(field);
      } catch (error) {
        toast.error('Update failed');
      }
    } else {
      try {
        await dispatch(updateTextBlog({ blogId: id, text: value })).unwrap();
        toast.success('Text was updated');
        handleToggleEdit(field);
      } catch (error) {
        toast.error('Update failed');
      }
    }
  } 

  useEffect(() => {
    dispatch(fetchBlogs())
      .unwrap()
      .then((response) => {
        const filteredBlog = response.find(blogs => blogs.id === id);
        setFilteredBlog(filteredBlog)
      })
  }, [dispatch]);

  useEffect(() => {
    setFilteredBlog(blogs.find(blogs => blogs.id === id));
  },[blogs])

  if (loading) return <p>Loading...</p>;
  if (!filteredBlog) return <p>Blog not found. <button onClick={() => navigate(-1)} className="underline text-blue-600">Back</button></p>;

  return (
    <div className='flex flex-col items-center'>
      <div className="w-full xs:w-3/4 lg:w-2/4 p-6">
        {isEditMode.title 
          ? <form onSubmit={handleSubmitTitle(data => handleFetchUpdate('title', data.title))} className='mb-6 relative'>
              <input 
                {...registerTitle('title')}
                placeholder="Edit title..."
                className={`w-full focus:outline-0 px-3 py-2 border border-gray-400 rounded-2xl resize-none focus:outline-none`}
              />
              <div className='absolute flex gap-2 h-full bottom-0 right-4'>
                <ButtonImage  onClick={() => handleToggleEdit('title')}>
                  <XCircleIcon className="h-6 w-6" />
                </ButtonImage>
                <ButtonImage type='submit'>
                  <BookmarkIcon className="h-6 w-6" />
                </ButtonImage>
              </div>
            </form>
          : <div className='flex items-center mb-6 gap-2'>
              <h1 className="text-3xl font-bold break-all max-w-full line-clamp-1">{filteredBlog.title}</h1>
                <ButtonImage onClick={() => handleToggleEdit('title')}>
                  <PencilIcon className="h-6 w-6" />
                </ButtonImage>
            </div> 
        }
        {isEditMode.text 
          ? <div className='relative w-full h-full'>
              <form onSubmit={handleSubmitText(data => handleFetchUpdate('text', data.text))}>
                <textarea
                  {...registerText('text')}
                  rows={5}
                  placeholder="Edit comment..."
                  className={`w-full focus:outline-0 p-3 border border-gray-400 rounded-2xl resize-none focus:outline-none`}
                  disabled={loading}
                />
                <div className='absolute flex gap-4 bottom-4 right-6'>
                  <ButtonImage 
                    onClick={() => handleToggleEdit('text')}
                    disabled={loading} 
                    className='mt-5'
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </ButtonImage>
                  <ButtonImage 
                    type='submit'
                    disabled={loading} 
                    className='mt-5'
                  >
                    <BookmarkIcon className="h-6 w-6" />
                  </ButtonImage>
                </div>
              </form>
            </div>
          : <div className='flex h-full gap-2'>
              <p className="text-gray-700 h-full break-all line-clamp-4">{filteredBlog.text}</p>
              <ButtonImage onClick={() => handleToggleEdit('text')} className='w-fit h-fit'>
                <PencilIcon className="h-6 w-6" />
              </ButtonImage>
            </div>
        }
      </div>
      <div className='w-full xs:w-3/4 lg:w-2/4'>
        <BlogComments blogId={id as string} />
      </div>
    </div>
  );
};


