import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostCard } from './PostCard';
import { fetchPosts, selectAllPosts } from './postsSlice';

export const Posts = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  /**
   * TODO:
   * - Can merge with posts as { post, status, error}
   */
  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  /**
   * TODO:
   * 1. Once new posts with date are added, remove ? after date
   */

  const orderedPosts = [...posts]?.sort((a, b) => b.date?.localeCompare(a.date));

  return (
    <section className="mt-10">
      {postStatus !== 'loading' && <div>Loading posts...</div>}
      {postStatus !== 'error' && <div>Some error occurred! Please retry!</div>}
      {postStatus !== 'fulfilled' && (orderedPosts.length !== 0 ? orderedPosts.map((post) => <PostCard key={post.id} post={post} />) : <div>No posts yet</div>)}
    </section>
  );
};
