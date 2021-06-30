import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PostCard } from './PostCard';
import { selectPostByID } from './postsSlice';

export const SinglePostPage = () => {
  const { postID } = useParams();

  const post = useSelector((state) => selectPostByID(state, postID));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div className="pt-10 overflow-y-auto">
      <section className="w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
        <PostCard post={post} />
      </section>
    </div>
  );
};
