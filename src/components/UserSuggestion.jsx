import { useState } from 'react';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const UserSuggestion = () => {
  const users = useSelector((state) => state.search.users);
  const loggedInUser = useSelector((state) => state.authentication.user);
  const navigate = useNavigate();
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const userNotFollowedByLoggedInUser = users.filter((user) => !loggedInUser.following.find((loggedInUserFollowing) => loggedInUserFollowing._id === user._id));

  return (
    <div className="my-10">
      <div className="text-black font-semibold text-lg mb-2">
        <h1 className="flex justify-between">
          Suggested for you{' '}
          <span className="cursor-pointer text-indigo-500 text-sm" onClick={() => setIsSuggestionsVisible((isSuggestionsVisible) => !isSuggestionsVisible)}>
            {isSuggestionsVisible ? 'Hide' : 'Show'}
          </span>
        </h1>
      </div>
      <div className="flex flex-nowrap overflow-x-auto suggestions pb-4">
        {isSuggestionsVisible &&
          userNotFollowedByLoggedInUser.slice(0, 5).map((user) => {
            return (
              user.username !== loggedInUser.username && (
                <div className="bg-white overflow-hidden shadow-lg rounded-lg mr-6 min-w-15" key={user.username}>
                  <div className="text-center p-6 border-b">
                    <Avatar name={user.firstName + ' ' + user.lastName} size="96" className="rounded-full h-24 w-24 object-cover object-center cursor-pointer mx-auto" alt={user.firstName} onClick={() => navigate(`/${user.username}`)} />
                    {/* <img className="h-24 w-24 rounded-full mx-auto cursor-pointer" src={user.profileImageURL} alt={user.firstName} onClick={() => navigate(`/${user.username}`)} /> */}
                    <p className="pt-2 text-lg font-semibold cursor-pointer" onClick={() => navigate(`/${user.username}`)}>
                      {user.firstName + ' ' + user.lastName}
                    </p>
                    <p className="text-sm text-gray-500 text-opacity-80 cursor-pointer" onClick={() => navigate(`/${user.username}`)}>
                      @{user.username}
                    </p>
                  </div>
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};
