import { useNavigate } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { Search } from '../search/Search';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);

  return (
    <nav className="py-2 h-16">
      <div className="w-6/7 mx-auto flex justify-between items-center h-full">
        <div className="logo">
          <h1 className="text-yellow-600 text-3xl cursor-pointer hidden md:block" onClick={() => navigate('/')}>
            <img className="mx-auto h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          </h1>
          <h1 className="text-yellow-600 text-3xl cursor-pointer md:hidden" onClick={() => navigate('/')}>
            <img className="mx-auto h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          </h1>
        </div>
        <div className="">
          <Search />
        </div>
        <div className="navContent flex justify-between items-center gap-x-1.5 md:gap-x-4">
          <BellIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          <img src={user.profileImageURL} className="rounded-full h-10 w-10 object-cover object-center cursor-pointer" alt="userimage" onClick={() => navigate(`/${user.username}`)} />
        </div>
      </div>
    </nav>
  );
};
