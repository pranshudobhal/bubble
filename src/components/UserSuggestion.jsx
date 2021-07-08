import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const UserSuggestion = () => {
  const users = useSelector((state) => state.search.users);
  const loggedInUser = useSelector((state) => state.authentication.user);
  const navigate = useNavigate();

  const userNotFollowedByLoggedInUser = users.filter((user) => !loggedInUser.following.find((loggedInUserFollowing) => loggedInUserFollowing._id === user._id));

  return (
    <div className="my-10">
      <div className="text-black font-semibold text-lg mb-2">
        <h1>Suggested for you</h1>
      </div>
      <div className="flex flex-nowrap overflow-x-auto suggestions pb-4">
        {userNotFollowedByLoggedInUser.slice(0, 5).map((user) => {
          return (
            user.username !== loggedInUser.username && (
              <div className="bg-white overflow-hidden shadow-lg rounded-lg mr-6 min-w-15" key={user.username}>
                <div className="text-center p-6 border-b">
                  <img className="h-24 w-24 rounded-full mx-auto cursor-pointer" src={user.profileImageURL} alt={user.firstName} onClick={() => navigate(`/${user.username}`)} />
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
