import { useSelector } from 'react-redux';

export const PostAuthor = ({ userID }) => {
  const user = useSelector((state) => state.users.find((user) => user.id === userID));

  return <span>by {user ? user.name : 'Unknown'}</span>;
};