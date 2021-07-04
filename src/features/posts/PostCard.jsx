import { useNavigate } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
// import { ReactionButtons } from './ReactionButtons';
import { TrashIcon } from '@heroicons/react/outline';

/**
 * TODO:
 * - If user is the one who posted, show delete button, otherwise dont
 */

export const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white cursor-pointer border border-gray-200 rounded-xl p-8 mb-6 shadow-md" onClick={() => navigate(`/posts/${post._id}`)}>
      <div className="flex flex-col">
        <div className="flex justify-between items-start" onClick={(e) => e.stopPropagation()}>
          <div className="self-start">
            <PostAuthor post={post} />
          </div>
          <div className="">
            <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="mt-8">
          <p className="mb-8 ml-2">{post.content}</p>
          {/* <ReactionButtons post={post} /> */}
        </div>
      </div>
    </div>
  );
};
