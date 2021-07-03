import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getAllPosts } from '../../services/posts/Posts.services';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostByID = (state, postID) => state.posts.posts.find((post) => post.id === postID);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getAllPosts();
  console.log({ response });
  return response.posts;
});

export const createNewPost = createAsyncThunk('posts/createNewPost', async (newPost) => {
  console.log({ newPost });
  const response = await createNewPost(newPost);
  console.log({ response });

  return response.post;
});

/**
 * The below was done for optimization, that it will only run when posts change
 */
// export const selectPostByUser = createSelector([selectAllPosts, (state, userID) => userID], (posts, userID) => posts.filter((post) => post.user === userID));

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action) {
      const { id, content } = action.payload;
      const postToBeUpdated = state.posts.find((post) => post.id === id);

      if (postToBeUpdated) {
        postToBeUpdated.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postID, reaction } = action.payload;
      const postToBeUpdated = state.posts.find((post) => post.id === postID);

      if (postToBeUpdated) {
        postToBeUpdated.reactions[reaction]++;
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [createNewPost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.posts.push(action.payload);
    },
    [createNewPost.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
  },
});

export const { postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;

// postAdded: {
//   reducer(state, action) {
//     state.push(action.payload);
//   },
//   prepare(content, userID) {
//     return {
//       payload: {
//         id: nanoid(),
//         date: new Date().toISOString(),
//         content,
//         user: userID,
//         reactions: {
//           heart: 0,
//         },
//       },
//     };
//   },
// },
