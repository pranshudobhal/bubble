import { useNavigate } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { TimeAgo } from './TimeAgo';
import { TrashIcon } from '@heroicons/react/outline';

/**
 * TODO:
 * - If user is the one who posted, show delete button, otherwise dont
 */

export const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer border border-gray-200 rounded-xl p-8 mb-6 shadow-sm" onClick={() => navigate(`/posts/${post.id}`)}>
      <div className="flex flex-col">
        <div className="flex justify-between items-start" onClick={(e) => e.stopPropagation()}>
          <div className="self-start">
            <PostAuthor userID={post.user} />
            <br />
            <TimeAgo timestamp={post.date} />
          </div>
          <div className="">
            <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="mt-8">
          <p className="mb-8">{post.content}</p>
          <ReactionButtons post={post} />
        </div>
      </div>
    </div>
  );
};
