import { NavLink } from 'react-router-dom';
import { BlogsData } from '../types/blogs';

interface IProps {
  blogData: BlogsData;
}

export const BlogItem = ({ blogData }: IProps) => {
  return (
    <NavLink
      to={`/blogs/${blogData.id}`}
      className="block w-72 h-48 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
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
        {blogData.content}
      </p>
    </NavLink>
  );
};
