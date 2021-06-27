import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectPostByID } from './postsSlice';
import { ReactionButtons } from './ReactionButtons';

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
    <section>
      <article className="post">
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
      </article>
    </section>
  );
};
