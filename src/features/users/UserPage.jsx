import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

// import { selectUserByUsername } from './usersSlice';
// import { selectPostByUser } from '../posts/postsSlice';
// import { PostCard } from '../posts/PostCard';
import { useEffect, useState } from 'react';
import { fetchUserByUsername } from './usersSlice';
import { XIcon } from '@heroicons/react/solid';

export const UserPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.users);

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserByUsername(username));
    }
  });

  // const postByUser = useSelector((state) => selectPostByUser(state, username));

  // const orderedPosts = [...postByUser]?.sort((a, b) => b.date?.localeCompare(a.date));

  return (
    <section className="mt-8 md:mt-16 w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
      <div>
        {status === 'loading' && <h1>Loading...</h1>}
        {status === 'error' && <h1>{error}</h1>}
        {status === 'fulfilled' && (
          <div>
            <div>
              <img src="https://unsplash.it/400/400" className="rounded-full h-40 w-40 object-cover object-center" alt="userimage" />
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{user.firstName + ' ' + user.lastName}</h1>
              <h2 className="text-md text-gray-500 text-opacity-80 mt-2">@{username}</h2>
              <div className="mt-2 text-md text-gray-500">
                <span className="mr-2 cursor-pointer" onClick={() => setShowFollowersModal((showFollowersModal) => !showFollowersModal)}>
                  20 Followers
                </span>
                {showFollowersModal && (
                  <>
                    <div className="justify-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-5/7 md:w-4/7 lg:w-3/7 xl:w-2/6 my-10 mx-auto max-w-3xl">
                        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-full">
                          <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Followers</h3>
                            <span className="text-black h-6 w-6 text-2xl block cursor-pointer" onClick={() => setShowFollowersModal(false)}>
                              <XIcon className="h-6 w-6 text-gray-500" />
                            </span>
                          </div>
                          <div className="relative p-6 flex-auto overflow-y-auto">
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                              I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could
                              do everything. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ducimus excepturi quisquam nihil adipisci eligendi sed eius sunt, in accusamus illum. Facere iure dolore totam aliquid quidem reiciendis dolor, architecto inventore at laboriosam nulla vitae,
                              sit praesentium porro nam sunt accusantium similique quod tempore non alias ad facilis. Neque dolorem veniam, eligendi, saepe ipsam ab aut sapiente consequatur voluptates ratione provident exercitationem expedita nam nihil. Tenetur mollitia repudiandae alias natus
                              perspiciatis eligendi sunt ipsum necessitatibus qui incidunt consectetur ut est quam officiis excepturi repellat sit molestias labore, assumenda pariatur. Adipisci soluta consequuntur doloribus veritatis veniam necessitatibus unde deleniti laborum velit?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                )}
                &bull;
                <span className="ml-2 cursor-pointer" onClick={() => setShowFollowingModal((showFollowingModal) => !showFollowingModal)}>
                  20 Following
                </span>
                {showFollowingModal && (
                  <>
                    <div className="justify-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-5/7 md:w-4/7 lg:w-3/7 xl:w-2/6 my-10 mx-auto max-w-3xl">
                        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-full">
                          <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Following</h3>
                            <span className="text-black h-6 w-6 text-2xl block cursor-pointer" onClick={() => setShowFollowingModal(false)}>
                              <XIcon className="h-6 w-6 text-gray-500" />
                            </span>
                          </div>
                          <div className="relative p-6 flex-auto overflow-y-auto">
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                              I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could
                              do everything. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ducimus excepturi quisquam nihil adipisci eligendi sed eius sunt, in accusamus illum. Facere iure dolore totam aliquid quidem reiciendis dolor, architecto inventore at laboriosam nulla vitae,
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                )}
              </div>
            </div>
            {/* {orderedPosts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))} */}
          </div>
        )}
      </div>
    </section>
  );
};
