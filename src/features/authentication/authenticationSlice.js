import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginService, signUpService } from '../../services/authentication';
import { followButtonClickedService, initializeLoggedInUserService, unFollowButtonClickedService } from '../../services/users/User.services';

export const loginUser = createAsyncThunk('authentication/loginUser', async (userDetails) => {
  const response = await loginService(userDetails);
  return { token: response.data.token, user: response.data.userData };
});

export const signUpUser = createAsyncThunk('authentication/signUpUser', async (userDetails) => {
  const response = await signUpService(userDetails);
  return { token: response.data.token, user: response.data.userData };
});

export const followButtonClicked = createAsyncThunk('authentication/followButtonClicked', async (userToFollowID) => {
  const response = await followButtonClickedService(userToFollowID);
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.followedUserData;
});

export const unFollowButtonClicked = createAsyncThunk('authentication/unFollowButtonClicked', async (userToUnfollowID) => {
  const response = await unFollowButtonClickedService(userToUnfollowID);
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.unfollowedUserData;
});

export const initializeLoggedInUser = createAsyncThunk('authentication/initializeLoggedInUser', async () => {
  const response = await initializeLoggedInUserService();
  return response.data.loggedInUser;
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: JSON.parse(localStorage.getItem('token')) || null,
  status: 'idle',
  error: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    resetAuthStateStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.status = 'fulfilled';
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = token;
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
    [signUpUser.pending]: (state) => {
      state.status = 'loading';
    },
    [signUpUser.fulfilled]: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.status = 'fulfilled';
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = token;
    },
    [signUpUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
    [followButtonClicked.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user.following.push(action.payload);
    },
    [followButtonClicked.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
    [unFollowButtonClicked.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      const updatedUserFollowing = state.user.following.filter((user) => user._id !== action.payload._id);
      state.user.following = updatedUserFollowing;
    },
    [unFollowButtonClicked.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
    [initializeLoggedInUser.pending]: (state, action) => {
      state.error = null;
      state.status = 'loading';
    },
    [initializeLoggedInUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
    },
    [initializeLoggedInUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
  },
});

export const { logoutUser, resetAuthStateStatus } = authenticationSlice.actions;

export default authenticationSlice.reducer;
