import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const Search = () => {
  const [searchedWord, setSearchedWord] = useState('');
  const { status, users } = useSelector((state) => state.search);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  const searchedUser = (searchedWord, users) => {
    if (searchedWord.trim() !== '') {
      return users.filter(({ firstName, lastName, username }) => {
        const usernameLowerCase = username.toLowerCase();
        const fullName = lastName !== '' ? firstName + ' ' + lastName : firstName;
        const fullNameLowerCase = fullName.toLowerCase();
        const searchedWordLowerCase = searchedWord.toLowerCase();

        return usernameLowerCase.includes(searchedWordLowerCase) || fullNameLowerCase.includes(searchedWordLowerCase);
      });
    } else {
      return [];
    }
  };

  const searchedUsersList = searchedUser(searchedWord, users);

  return (
    <>
      <div className="relative text-gray-600 flex items-center">
        <input
          type="search"
          name="serch"
          placeholder="Search"
          value={searchedWord}
          onChange={(e) => {
            setSearchedWord(e.target.value);
            setShowSearchModal(true);
          }}
          className="bg-white h-10 px-5 pr-10 rounded-full border border-gray-200 text-sm focus:outline-none ring-0 focus:ring-0 focus:ring-gray-400 focus:border-gray-400"
        />
        <span className="absolute right-0 top-0 mt-2 mr-3">
          <SearchIcon className="h-6 w-6 text-gray-500 text-opacity-60 cursor-pointer" />
        </span>
        {showSearchModal && (
          <div className="absolute top-2 w-full my-10 mx-auto max-w-3xl z-50">
            <div className=" border-gray-200 border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-full">
              <div className="relative px-4 pt-2 pb-4 flex-auto overflow-y-auto modal">
                <ul>
                  {searchedUsersList.length !== 0 ? (
                    searchedUsersList.map((user) => {
                      return (
                        <li key={user._id} className="flex p-0 py-4 items-center">
                          <div
                            className="self-start mr-2 cursor-pointer"
                            onClick={() => {
                              setShowSearchModal(false);
                              navigate(`/${user.username}`);
                              setSearchedWord('');
                            }}
                          >
                            <img src={user.profileImageURL} className="rounded-full h-12 w-12 object-cover object-center" alt="userimage" />
                          </div>
                          <div className="text-black font-semibold text-md flex flex-col flex-1 truncate">
                            <span
                              className="w-full cursor-pointer truncate"
                              onClick={() => {
                                setShowSearchModal(false);
                                navigate(`/${user.username}`);
                                setSearchedWord('');
                              }}
                            >
                              {user.firstName + ' ' + user.lastName}
                            </span>
                            <span
                              className="text-sm text-gray-500 text-opacity-80 font-normal w-full cursor-pointer truncate"
                              onClick={() => {
                                setShowSearchModal(false);
                                navigate(`/${user.username}`);
                                setSearchedWord('');
                              }}
                            >
                              @{user.username}
                            </span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <>
                      {searchedWord.trim() === '' && showSearchModal ? (
                        setShowSearchModal(false)
                      ) : (
                        <div className="flex justify-center items-center h-36">
                          <h2 className="text-xl">{status === 'error' ? 'Some error occurred. Please try again later!' : 'No users found!'}</h2>
                        </div>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
