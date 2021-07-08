import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';

export const NewPost = () => {
  const [content, setContent] = useState('');
  const {
    user: { _id: userID },
  } = useSelector((state) => state.authentication);
  const postStatus = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();
  const onContentChanged = (e) => setContent(e.target.value);

  const onNewPostClicked = () => {
    if (content !== '' && postStatus !== 'loading') {
      dispatch(addNewPost({ userID, content }));
      setContent('');
    }
  };

  return (
    <section className="border border-gray-200 rounded-lg p-6 shadow-md bg-white">
      <form className="flex flex-col">
        <textarea className="h-20 mb-2 border-0 rounded resize-none" id="postContent" name="postContent" placeholder="What's happening?" value={content} onChange={onContentChanged} />
        <button type="button" className="bg-blue-500 text-white rounded-lg w-max py-2 px-6 mt-2 self-end disabled:opacity-50" onClick={onNewPostClicked} disabled={postStatus !== 'loading' ? false : true}>
          New Post
        </button>
      </form>
    </section>
  );
};
