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
    const userID = 'cHLFomHWQk9XXGv4SPZm9';
    if (content !== '') {
      dispatch(addNewPost({ content, userID }));

      setContent('');
    }
  };

  return (
    <section className="border border-gray-200 rounded-xl p-4 shadow-sm">
      <form className="flex flex-col">
        <textarea className="h-20 mb-2" id="postContent" name="postContent" placeholder="What's happening?" value={content} onChange={onContentChanged} />
        <button type="button" className="bg-blue-500 text-white rounded-full w-max py-2 px-6 mt-1 self-end" onClick={onNewPostClicked}>
          New Post
        </button>
      </form>
    </section>
  );
};
