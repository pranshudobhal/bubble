import { useNavigate } from 'react-router';
import { TimeAgo } from './TimeAgo';

export const PostAuthor = ({ post }) => {
  const { firstName, lastName, username, profileImageURL } = post.user;
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="self-start mr-3">
        <img src={profileImageURL} className="rounded-full h-14 w-14 object-cover object-center cursor-pointer" alt="userimage" onClick={() => navigate(`/${username}`)} />
      </div>
      <div className="text-black font-semibold text-md flex flex-col justify-center flex-1">
        <div className="flex items-baseline cursor-pointer" onClick={() => navigate(`/${username}`)}>
          <div>{firstName + ' ' + lastName}</div>
          <div className="text-sm text-gray-500 text-opacity-80 font-normal ml-1">@{username}</div>
        </div>
        <TimeAgo timestamp={post.createdAt} />
      </div>
    </div>
  );
};
