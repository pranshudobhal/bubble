import { useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';

export const NewPost = () => {
  const [content, setContent] = useState('');
  const {
    user: { _id: userID, firstName, lastName },
  } = useSelector((state) => state.authentication);
  const postStatus = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();
  const onContentChanged = (e) => setContent(e.target.value);
  const isNewPostButtonDisabled = postStatus !== 'loading' && content.trim() === '';
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onNewPostClicked = () => {
    const trimmedContent = content.trim();
    if (trimmedContent !== '' && postStatus !== 'loading') {
      dispatch(addNewPost({ userID, content }));
      setIsSubmitted(true);
      setContent('');
    }
    isNewPostButtonDisabled && setIsSubmitted(false);
  };

  return (
    <section className="border border-gray-200 rounded-lg p-6 shadow-md bg-white">
      <form className="flex">
        <Avatar name={firstName + ' ' + lastName} size="60" className="rounded-full object-cover object-center cursor-pointer" alt={firstName} />
        <section className="ml-2 flex flex-col flex-1">
          <textarea className="h-20 mb-2 border-0 rounded resize-none" id="postContent" name="postContent" placeholder="What's happening?" value={content} onChange={onContentChanged} />
          <button type="button" className="bg-blue-500 text-white rounded-lg w-max py-2 px-6 mt-2 self-end disabled:opacity-50" onClick={onNewPostClicked} disabled={isNewPostButtonDisabled}>
            {isSubmitted && postStatus === 'loading' ? 'Posting' : 'New Post'}
          </button>
        </section>
      </form>
    </section>
  );
};
