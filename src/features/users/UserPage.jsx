import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PostCard } from '../posts/PostCard';
import { useEffect, useState } from 'react';
import { fetchPostsByUsername, fetchUserByUsername, resetUser } from './usersSlice';
import { Modal } from './Modal';
import { followButtonClicked, logoutUser, unFollowButtonClicked } from '../authentication/authenticationSlice';
import Avatar from 'react-avatar';

export const UserPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user, posts: postsByUser, status, error } = useSelector((state) => state.users);
  const loggedInUser = useSelector((state) => state.authentication.user);
  const isUserFollowed = loggedInUser.following.some((user) => user.username === username);

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const orderedPosts = [...postsByUser]?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const followUnfollowHandler = (userToFollowID) => {
    if (isUserFollowed) {
      dispatch(unFollowButtonClicked(userToFollowID));
    } else {
      dispatch(followButtonClicked(userToFollowID));
    }
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(fetchUserByUsername(username));
    dispatch(fetchPostsByUsername(username));
  }, [dispatch, username, loggedInUser.following.length, loggedInUser.followers.length]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, username]);

  return (
    <section className="mt-8 pb-8 md:mt-16 w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
      <div>
        {status === 'loading' && <h1 className="text-3xl text-center">Loading...</h1>}
        {status === 'error' && user === null && <h1 className="text-3xl text-center">{error}</h1>}
        {status === 'fulfilled' && user !== null && (
          <div>
            <div className="flex justify-between items-center">
              <Avatar name={user.firstName + ' ' + user.lastName} size="160" className="rounded-full h-40 w-40 object-cover object-center" />
              {/* <img src={user.profileImageURL} className="rounded-full h-40 w-40 object-cover object-center" alt="userimage" /> */}
              {loggedInUser.username !== username && (
                <button className="rounded-lg bg-blue-600 hover:bg-opacity-80 text-white font-semibold py-3 px-12 mr-2 sm:mr-4" onClick={() => followUnfollowHandler(user._id)}>
                  {isUserFollowed ? 'Unfollow' : 'Follow'}
                </button>
              )}
              {loggedInUser.username === username && (
                <button className="rounded-lg bg-blue-600 hover:bg-opacity-80 text-white font-semibold py-3 px-12 mr-2 sm:mr-4" onClick={logoutHandler}>
                  Logout
                </button>
              )}
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{user.firstName + ' ' + user.lastName}</h1>
              <h2 className="text-md text-gray-500 text-opacity-80 mt-2">@{username}</h2>
              <div className="mt-2 text-md text-gray-500">
                <span className="mr-2 cursor-pointer" onClick={() => setShowFollowersModal((showFollowersModal) => !showFollowersModal)}>
                  {user?.followers?.length} Followers
                </span>
                {showFollowersModal && <Modal setShowModal={setShowFollowersModal} heading={'Followers'} content={user.followers} error={'No followers yet'} />}
                &bull;
                <span className="ml-2 cursor-pointer" onClick={() => setShowFollowingModal((showFollowingModal) => !showFollowingModal)}>
                  {user?.following?.length} Following
                </span>
                {showFollowingModal && <Modal setShowModal={setShowFollowingModal} heading={'Following'} content={user.following} error={'No Following'} />}
              </div>
            </div>
            <hr className="mt-8 border-gray-200 border-opacity-60" />
            <div className="mt-8">{status === 'fulfilled' && orderedPosts.length !== 0 ? orderedPosts.map((post) => <PostCard key={post._id} post={post} />) : <div className="text-2xl text-center">No posts yet</div>}</div>
          </div>
        )}
      </div>
    </section>
  );
};
