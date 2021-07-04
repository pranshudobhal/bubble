import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { createNewPost, getAllPosts } from '../../services/posts/Posts.services';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostByID = (state, postID) => state.posts.posts.find((post) => post._id === postID);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getAllPosts();
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.allPosts;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
  const response = await createNewPost(newPost);
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.newPostData;
});

export const selectPostByUser = createSelector([selectAllPosts, (state, username) => username], (posts, username) => posts.filter((post) => post.userID.username === username));

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
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [addNewPost.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.posts.push(action.payload);
    },
    [addNewPost.rejected]: (state, action) => {
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
