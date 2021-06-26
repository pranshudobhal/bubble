import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';

export const NewPost = () => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const onContentChanged = (e) => setContent(e.target.value);

  const onNewPostClicked = () => {
    //UserID will come from the user who is logged in
    const userID = '1';
    if (content !== '') {
      console.log(userID);
      dispatch(postAdded(content, userID));

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
