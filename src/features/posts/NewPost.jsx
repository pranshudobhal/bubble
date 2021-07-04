import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';

/**
 * TODO:
 * - Handle disable submit when one API request has been sent already
 */

export const NewPost = () => {
  const [content, setContent] = useState('');
  const {
    user: { userID },
  } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  const onContentChanged = (e) => setContent(e.target.value);

  const onNewPostClicked = () => {
    if (content !== '') {
      dispatch(addNewPost({ userID, content }));
      setContent('');
    }
  };

  return (
    <section className="border border-gray-200 rounded-xl p-6 shadow-md bg-white">
      <form className="flex flex-col">
        <textarea className="h-20 mb-2 border-0 rounded resize-none" id="postContent" name="postContent" placeholder="What's happening?" value={content} onChange={onContentChanged} />
        <button type="button" className="bg-blue-500 text-white rounded-full w-max py-2 px-6 mt-2 self-end" onClick={onNewPostClicked}>
          New Post
        </button>
      </form>
    </section>
  );
};
