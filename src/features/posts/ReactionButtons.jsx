import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  heart: '❤️',
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" onClick={() => dispatch(reactionAdded({ postID: post._id, reaction: name }))}>
        {emoji} {post?.reactions[name]}
      </button>
    );
  });

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-max">
      {reactionButtons}
    </div>
  );
};
