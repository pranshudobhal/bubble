import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectPostByUser } from '../posts/postsSlice';
import { PostCard } from '../posts/PostCard';
import { useEffect, useState } from 'react';
import { fetchUserByUsername, resetUser } from './usersSlice';
import { Modal } from './Modal';

export const UserPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.users);
  const { status: postStatus, error: postError } = useSelector((state) => state.posts);

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserByUsername(username));
  }, [dispatch, username]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  const data = [
    {
      id: 1,
      firstName: 'Jeanette',
      lastName: 'Penddreth',
      username: 'jpenddreth0',
    },
    {
      id: 2,
      firstName: 'Giavani',
      lastName: 'Frediani',
      username: 'gfrediani1',
    },
    {
      id: 3,
      firstName: 'Noell',
      lastName: 'Bea',
      username: 'nbea2',
    },
    {
      id: 4,
      firstName: 'Willard',
      lastName: 'Valek',
      username: 'wvalek3',
    },
  ];

  const data1 = [
    {
      id: 1,
      firstName: 'Jeanette',
      lastName: 'Penddreth',
      username: 'jpenddreth0',
    },
    {
      id: 2,
      firstName: 'Giavani',
      lastName: 'Frediani',
      username: 'gfrediani1',
    },
  ];

  const postByUser = useSelector((state) => selectPostByUser(state, username));

  const orderedPosts = [...postByUser]?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <section className="mt-8 md:mt-16 w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
      <div>
        {status === 'loading' && <h1 className="text-3xl text-center">Loading...</h1>}
        {status === 'error' && user === null && <h1 className="text-3xl text-center">{error}</h1>}
        {status === 'fulfilled' && user !== null && (
          <div>
            <div>
              <img src={user.profileImageURL} className="rounded-full h-40 w-40 object-cover object-center" alt="userimage" />
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{user.firstName + ' ' + user.lastName}</h1>
              <h2 className="text-md text-gray-500 text-opacity-80 mt-2">@{username}</h2>
              <div className="mt-2 text-md text-gray-500">
                <span className="mr-2 cursor-pointer" onClick={() => setShowFollowersModal((showFollowersModal) => !showFollowersModal)}>
                  20 Followers
                </span>
                {showFollowersModal && <Modal setShowModal={setShowFollowersModal} heading={'Followers'} content={data} />}
                &bull;
                <span className="ml-2 cursor-pointer" onClick={() => setShowFollowingModal((showFollowingModal) => !showFollowingModal)}>
                  20 Following
                </span>
                {showFollowingModal && <Modal setShowModal={setShowFollowingModal} heading={'Following'} content={data1} />}
              </div>
            </div>
            <hr className="mt-8 border-gray-200 border-opacity-60" />
            <div className="mt-8">
              {postStatus === 'error' && <h1 className="text-3xl text-center">{postError}</h1>}
              {orderedPosts?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
