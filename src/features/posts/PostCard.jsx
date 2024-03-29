import { useLocation, useNavigate } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { TrashIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from './postsSlice';

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useLocation();
  const loggedInUser = useSelector((state) => state.authentication.user);

  const deletePostHandler = (postID) => {
    dispatch(deletePost(postID));
  };

  return (
    <div className="bg-white cursor-pointer border border-gray-200 rounded-lg p-8 mb-6 shadow-md" onClick={() => navigate(`/posts/${post._id}`)}>
      <div className="flex flex-col">
        <div className="flex justify-between items-start" onClick={(e) => e.stopPropagation()}>
          <div className="self-start mr-2">
            <PostAuthor post={post} />
          </div>
          {loggedInUser._id === post.user._id && state.pathname !== `/posts/${post._id}` && state.pathname !== '/' && (
            <div onClick={() => deletePostHandler(post._id)} className="self-center">
              <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>
          )}
        </div>
        <div className="mt-8">
          <p className="mb-8 ml-2">{post.content}</p>
          <ReactionButtons post={post} />
        </div>
      </div>
    </div>
  );
};
