import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { addComment, deleteComment, fetchCommentsByBlogId, updateComment } from '../features/comments/commentsThunk';
import { toast } from 'react-toastify';
import { ButtonImage, ButtonPrimary } from './UI/buttons';
import { PencilSquareIcon, TrashIcon, BookmarkIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CommentData } from '../types/comment';

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
  const [selectedComment, setSelectedComment] = useState<CommentData>();
  const stylesForActionButtons = '!p-0 !justify-end !border-none hover:!border-none hover:!bg-white';

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setValueEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  useEffect(() => {
    dispatch(fetchCommentsByBlogId(blogId));
  }, [dispatch, blogId]);

  const handleAddComment = async (data: CommentFormData) => {
    await dispatch(addComment({ blogId, author: 'User', text: data.text }))
      .then((response) => {
        if(response) {
          toast.success('Comment created');
        }
    });
    await dispatch(fetchCommentsByBlogId(blogId));
    resetCreate();
  };

  const handleDeleteComment = async (commentId: string) => {
    await dispatch(deleteComment({ blogId, commentId }))
      .then((response) => {
        if(response) {
          toast.success('Comment deleted');
        }
    });
    await dispatch(fetchCommentsByBlogId(blogId));
  };

  const handleToggleEdit = (comment: CommentData) => {
    setSelectedComment(comment);
    setValueEdit('text', comment.text);
  };

  const handleEditComment = async (data: CommentFormData) => {
    if(!selectedComment) return;

    await dispatch(updateComment({ 
      blogId, 
      commentId: selectedComment.id,
      text: data.text
    })).then((response) => {
      if(response) {
        toast.success('Comment updated');
        setSelectedComment(undefined);
        resetEdit();
      };
    })
    await dispatch(fetchCommentsByBlogId(blogId));
  }

  const handleCancelEditComment = () => {
    setSelectedComment(undefined);
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <div className="space-y-4 max-h-96 overflow-y-auto px-4">
        {comments.length === 0 && <p className="text-gray-500">No comments yet</p>}
        {comments.map((comment, index) => (
          <div key={index} className="flex flex-col gap-4 px-4 pt-2 pb-4 bg-gray-50 rounded-2xl shadow-sm justify-between">
            <div className='flex justify-between w-full'>
              <p className="font-semibold text-gray-700">{comment.author}</p>
              <time className="text-xs text-gray-400">
                  {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleString() : ''}
              </time>
            </div>
            <div className='flex justify-between gap-4'>
              {selectedComment?.id === comment.id 
                ? ( <div className='h-full w-full relative'>
                      <form onSubmit={handleSubmitEdit(handleEditComment)}>
                        <textarea
                          {...registerEdit('text')}
                          rows={4}
                          placeholder="Edit comment..."
                          className={`w-full focus:outline-0 p-3 border border-gray-400 rounded-2xl resize-none focus:outline-none ${
                            errorsEdit.text ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                          }`}
                          disabled={loading}
                        />
                        <div className='absolute flex gap-4 bottom-4 right-6'>
                          <ButtonImage 
                            onClick={handleCancelEditComment}
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
                  ) 
                : ( <div className="max-w-full w-full max-h-[100px] line-clamp-4 break-all text-md">{comment.text}</div>  )}
              <div className='flex flex-col gap-4 justify-around'>
                <ButtonPrimary 
                  className={stylesForActionButtons}
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <TrashIcon className="h-6 w-6 text-gray-500" />
                </ButtonPrimary>
                <ButtonPrimary 
                  className={stylesForActionButtons}
                  onClick={() => handleToggleEdit(comment)}  
                >
                  <PencilSquareIcon className="h-6 w-6 text-gray-500" />
                </ButtonPrimary>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitCreate(handleAddComment)} className="mt-4">
        <textarea
          {...registerCreate('text')}
          rows={4}
          placeholder="Enter comment..."
          className={`w-full p-3 border border-gray-400 rounded-2xl resize-none focus:outline-none focus:ring-2 ${
            errorsCreate.text ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          disabled={loading}
        />
        {errorsCreate.text && <p className="text-red-600 mt-1">{errorsCreate.text.message}</p>}

        <ButtonPrimary 
          type='submit'
          disabled={loading} 
          className='mt-5'
        >
          {loading ? 'Submiting...' : 'Submit'}
        </ButtonPrimary>
      </form>
    </div>
  );
};
