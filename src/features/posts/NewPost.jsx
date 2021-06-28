import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from './postsSlice';

/**
 * TODO:
 * - Handle disable submit when one API request has been sent already
 */

export const NewPost = () => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const onContentChanged = (e) => setContent(e.target.value);

  const onNewPostClicked = () => {
    //UserID will come from the user who is logged in
    /**
     * FIXME:
     * userID will change so will give ID of undefined error
     */
    const userID = 'UMhDXm_3IWFRMin4YMtSG';
    if (content !== '') {
      dispatch(addNewPost({ content, userID }));

      setContent('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <button type="button" onClick={onNewPostClicked}>
          New Post
        </button>
      </form>
    </section>
  );
};
