import { createAsyncThunk, createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostByID = (state, postID) => state.posts.posts.find((post) => post.id === postID);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await client.get('/fakeApi/posts');
    return response.posts;
  } catch (error) {
    console.log(error);
  }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
  try {
    const response = await client.post('/fakeApi/posts', { post: newPost });
    return response.post;
  } catch (error) {
    console.log(error);
  }
});

export const selectPostByUser = createSelector([selectAllPosts, (state, userID) => userID], (posts, userID) => posts.filter((post) => post.user === userID));

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
      state.error = action.error.message;
      state.status = 'error';
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
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
