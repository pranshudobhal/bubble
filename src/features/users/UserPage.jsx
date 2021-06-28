import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { selectUserByID } from './usersSlice';
import { selectPostByUser } from '../posts/postsSlice';

export const UserPage = () => {
  const { userID } = useParams();

  const user = useSelector((state) => selectUserByID(state, userID));

  const postByUser = useSelector((state) => selectPostByUser(state, userID));

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>
        {postByUser?.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.content}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
