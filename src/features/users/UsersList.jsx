import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectAllUsers } from './usersSlice';

export const UserList = () => {
  const users = useSelector(selectAllUsers);

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/profile/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
