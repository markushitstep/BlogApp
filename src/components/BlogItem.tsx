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
      <div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{blogData.title}</h3>
        <p
          className="text-gray-600 text-sm line-clamp-4"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {blogData.text}
        </p>
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
