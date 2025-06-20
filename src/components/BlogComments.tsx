import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { CommentData } from '../types/comment';
import { addComment, fetchCommentsByBlogId } from '../features/comments/commentsThunk';
import { toast } from 'react-toastify';

const commentSchema = z.object({
  text: z.string().min(5, 'Комментарий не может быть пустым'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface IProps {
  blogId: string;
}

export const BlogComments = ({ 
  blogId 
}: IProps) => {
  const dispatch = useAppDispatch();
  const { comments, loading } = useAppSelector(state => state.comments);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  useEffect(() => {
    dispatch(fetchCommentsByBlogId(blogId));
  }, [dispatch, blogId]);

  const onSubmit = async (data: CommentFormData) => {
    await dispatch(addComment({ blogId, author: 'User', text: data.text }))
      .then((response) => {
        if(response) {
          toast.success('Comment created');
        }
    });
    await dispatch(fetchCommentsByBlogId(blogId));
    reset();
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <ul className="space-y-4 max-h-96 overflow-y-auto">
        {comments.length === 0 && <p className="text-gray-500">No comments yet</p>}
        {comments.map((c, index) => (
          <li key={index} className="p-4 bg-gray-50 rounded shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-700">{c.author}</span>
              <time className="text-xs text-gray-400">
                {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString() : ''}
              </time>
            </div>
            <p className="text-gray-800">{c.text}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)}  className="mt-4">
        <textarea
          {...register('text')}
          rows={4}
          placeholder="Enter comment..."
          className={`w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 ${
            errors.text ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          disabled={loading}
        />
        {errors.text && <p className="text-red-600 mt-1">{errors.text.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-3 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submiting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
