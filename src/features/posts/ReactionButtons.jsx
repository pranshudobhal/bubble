import { useDispatch, useSelector } from 'react-redux';
import { reactionAdded, reactionRemoved } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.authentication.user);

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const isEmojiAlreadySelected = post.reactions[name].find((user) => user === userID);

    return (
      <button
        key={name}
        type="button"
        className={`${isEmojiAlreadySelected && 'text-blue-600'} p-2 rounded-lg mr-6 hover:bg-gray-100`}
        onClick={() => (isEmojiAlreadySelected ? dispatch(reactionRemoved({ postID: post._id, reaction: name, userID })) : dispatch(reactionAdded({ postID: post._id, reaction: name, userID })))}
      >
        {emoji} {post.reactions[name].length}
      </button>
    );
  });

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-max ml-2">
      {reactionButtons}
    </div>
  );
};
