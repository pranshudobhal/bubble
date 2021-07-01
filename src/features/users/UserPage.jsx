import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectUserByID } from './usersSlice';
import { selectPostByUser } from '../posts/postsSlice';
import { PostCard } from '../posts/PostCard';

export const UserPage = () => {
  const { username } = useParams();

  const user = useSelector((state) => selectUserByID(state, username));

  const postByUser = useSelector((state) => selectPostByUser(state, username));

  const orderedPosts = [...postByUser]?.sort((a, b) => b.date?.localeCompare(a.date));

  return (
    <section className="mt-10 w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
      <div className="">
        <img src="https://unsplash.it/400/400" className="rounded-full h-32 w-32 object-cover object-center" alt="userimage" />
      </div>
      <h2>{user.name}</h2>
      {orderedPosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};
