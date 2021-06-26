import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { TimeAgo } from './TimeAgo';

export const Posts = () => {
  const posts = useSelector((state) => state.posts);

  /**
   * TODO:
   * 1. Once new posts with date are added, remove ? after date
   */

  const orderedPosts = [...posts].sort((a, b) => b.date?.localeCompare(a.date));
  console.log({ orderedPosts });
  return (
    <div>
      <h2>Posts</h2>
      {orderedPosts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <p>{post.content}</p>
            <PostAuthor userID={post.user} />
            <TimeAgo timestamp={post.date} />
          </Link>
          <ReactionButtons post={post} />
        </div>
      ))}
    </div>
  );
};
