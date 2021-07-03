import { useNavigate } from 'react-router-dom';
import { SearchIcon, BellIcon, LogoutIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authentication/authenticationSlice';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="py-2 h-16">
      <div className="w-6/7 mx-auto flex justify-between items-center h-full">
        <div className="logo">
          <h1 className="text-yellow-600 text-3xl cursor-pointer" onClick={() => navigate('/')}>
            Bubble
          </h1>
        </div>
        <div className="navContent flex justify-between items-center gap-x-4">
          <SearchIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          <BellIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          <UserCircleIcon className="h-10 w-10 text-gray-500 cursor-pointer" onClick={() => navigate(`/${user.username}`)} />
          <LogoutIcon className="h-10 w-10 text-gray-500 cursor-pointer" onClick={logoutHandler} />
        </div>
      </div>
    </nav>
  );
};
