import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PostCard } from './PostCard';
import { selectPostByID } from './postsSlice';

export const SinglePostPage = () => {
  const { postID } = useParams();
  const post = useSelector((state) => selectPostByID(state, postID));
  const postStatus = useSelector((state) => state.posts.status);

  return (
    <>
      {postStatus === 'loading' && (
        <div className="pt-10">
          <section className="w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
            <h1 className="text-3xl text-center">Loading post...</h1>
          </section>
        </div>
      )}
      {postStatus === 'fulfilled' && !post && (
        <div className="pt-10">
          <section className="w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
            <h1 className="text-3xl text-center">Post not found!</h1>
          </section>
        </div>
      )}
      {postStatus === 'fulfilled' && post && (
        <div className="pt-10 overflow-y-auto">
          <section className="w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
            <PostCard post={post} />
          </section>
        </div>
      )}
    </>
  );
};
