import { useNavigate } from 'react-router';
import { TimeAgo } from './TimeAgo';
import Avatar from 'react-avatar';

export const PostAuthor = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="self-start mr-3">
        <Avatar name={post.user.firstName + ' ' + post.user.lastName} size="56" className="rounded-full object-cover object-center cursor-pointer" alt={post.user.firstName} onClick={() => navigate(`/${post.user.username}`)} />
        {/* <img src={profileImageURL} className="rounded-full h-14 w-14 object-cover object-center cursor-pointer" alt="userimage" onClick={() => navigate(`/${username}`)} /> */}
      </div>
      <div className="text-black font-semibold text-md flex flex-col justify-center flex-1 truncate">
        <div className="flex items-baseline cursor-pointer w-full" onClick={() => navigate(`/${post.user.username}`)}>
          <div>{post.user.firstName + ' ' + post.user.lastName}</div>
          <div className="text-sm text-gray-500 text-opacity-80 font-normal ml-1 truncate">@{post.user.username}</div>
        </div>
        <TimeAgo timestamp={post.createdAt} />
      </div>
    </div>
  );
};
