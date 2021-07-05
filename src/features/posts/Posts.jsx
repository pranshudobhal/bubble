import { useSelector } from 'react-redux';
import { PostCard } from './PostCard';
import { selectAllPosts } from './postsSlice';

export const Posts = () => {
  const posts = useSelector(selectAllPosts);
  const { status, error } = useSelector((state) => state.posts);

  const orderedPosts = [...posts]?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <section className="mt-10">
      {status === 'loading' && posts.length === 0 && <div>Loading posts...</div>}
      {status === 'error' && <div>{error}</div>}
      {status === 'fulfilled' && (orderedPosts.length !== 0 && orderedPosts[0] !== undefined ? orderedPosts.map((post) => <PostCard key={post._id} post={post} />) : <div className="text-2xl">No posts yet</div>)}
    </section>
  );
};
