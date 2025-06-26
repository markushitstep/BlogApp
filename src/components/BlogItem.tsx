import { NavLink } from 'react-router-dom';
import { BlogsData } from '../types/blogs';
import { useAppDispatch } from '../hooks/hooks';
import { deleteBlog } from '../features/blogs/blogsThunk';
import { toast } from 'react-toastify';
import { ButtonPrimary } from './UI/buttons';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface IProps {
  blogData: BlogsData;
}

export const BlogItem = ({ blogData }: IProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteBlog =  (blogId: string) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(deleteBlog(blogId)).then(() => {
        toast.success('Blog deleted');
      });
    }
  }

  return (
    <NavLink
      to={`/blogs/${blogData.id}`}
      className="relative block w-68 h-48 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className='flex flex-col gap-4'>
        <h3 className="max-w-full w-10/12 text-lg font-semibold line-clamp-4">{blogData.title}</h3>
        <div className="text-gray-600 text-sm line-clamp-5">
          {blogData.text}
        </div>
      </div>
      <div className='absolute top-0 right-0'>
        <ButtonPrimary 
          className='!p-2 !justify-end !pointer !border-none hover:!border-none hover:!bg-white'
          onClick={handleDeleteBlog(blogData.id)}
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </ButtonPrimary>
      </div>
    </NavLink>
  );
};
