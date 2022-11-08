import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { createNewPostService, deletePostService, getAllPostsService, reactionAddedService, reactionRemovedService } from '../../services';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostByID = (state, postID) => state.posts.posts.find((post) => post._id === postID);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getAllPostsService();
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.allPosts;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
  const response = await createNewPostService(newPost);
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.newPostData;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postID) => {
  const response = await deletePostService(postID);
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.post;
});

export const reactionAdded = createAsyncThunk('posts/reactionAdded', async ({ postID, reaction, userID }) => {
  const response = await reactionAddedService({ postID, reaction, userID });
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data;
});

export const reactionRemoved = createAsyncThunk('posts/reactionRemoved', async ({ postID, reaction, userID }) => {
  const response = await reactionRemovedService({ postID, reaction, userID });
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data;
});

export const selectPostByUser = createSelector([selectAllPosts, (state, username) => username], (posts, username) => posts.filter((post) => post.user.username === username));

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
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = state.posts.concat(action.payload);
      state.status = 'fulfilled';
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [addNewPost.pending]: (state) => {
      state.status = 'loading';
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.status = 'fulfilled';
    },
    [addNewPost.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [deletePost.fulfilled]: (state, action) => {
      const postToBeDeletedIndex = state.posts.findIndex((post) => post._id === action.payload._id);
      if (postToBeDeletedIndex !== -1) {
        state.posts.splice(postToBeDeletedIndex, 1);
      }
      state.status = 'fulfilled';
    },
    [deletePost.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [reactionAdded.fulfilled]: (state, action) => {
      const { postID, reaction, userID } = action.payload;
      const postToBeUpdated = state.posts.find((post) => post._id === postID);

      if (postToBeUpdated) {
        postToBeUpdated.reactions[reaction].push(userID);
      }
      state.status = 'fulfilled';
    },
    [reactionAdded.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [reactionRemoved.fulfilled]: (state, action) => {
      const { postID, reaction, userID } = action.payload;
      const postToBeUpdatedIndex = state.posts.findIndex((post) => post._id === postID);
      const reactionToBeUpdated = state.posts[postToBeUpdatedIndex].reactions[reaction];

      if (postToBeUpdatedIndex !== -1) {
        reactionToBeUpdated.splice(
          reactionToBeUpdated.findIndex((user) => user === userID),
          1
        );
      }
      state.status = 'fulfilled';
    },
    [reactionRemoved.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
  },
});

export const { postUpdated } = postSlice.actions;

export default postSlice.reducer;
