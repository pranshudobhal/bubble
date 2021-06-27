import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { fetchPosts, selectAllPosts } from './postsSlice';
import { ReactionButtons } from './ReactionButtons';
import { TimeAgo } from './TimeAgo';

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

  const orderedPosts = [...posts.posts]?.sort((a, b) => b.date?.localeCompare(a.date));

  return (
    <div>
      <h2>Posts</h2>
      {postStatus === 'loading' && <div>Loading posts...</div>}
      {postStatus === 'error' && <div>Some error occurred! Please retry!</div>}
      {postStatus === 'fulfilled' &&
        (orderedPosts.length !== 0 ? (
          orderedPosts.map((post) => (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <p>{post.content}</p>
                <PostAuthor userID={post.user} />
                <TimeAgo timestamp={post.date} />
              </Link>
              <ReactionButtons post={post} />
            </div>
          ))
        ) : (
          <div>No posts yet</div>
        ))}
    </div>
  );
};
